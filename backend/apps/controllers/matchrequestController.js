const express = require('express');
const User = require('../models/user'); 
const MatchRequest = require('../models/matchrequest');

// Find potential matches based on skill compatibility
let findMatch = async (req, res) => {
  try {
    let userId = req.params.id;

    let currentUser = await User.findById(userId);
    if (!currentUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    const potentialMatches = await User.find({
      _id: { $ne: userId },
      skillsOffered: { $in: currentUser.skillsNeeded }
    }).select("-password");

    res.status(200).json({ matches: potentialMatches });

  } catch (error) {
    console.error("Match finding error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Send a match request
let sendMatchRequest = async (req, res) => {
  const { senderId, receiverId, message } = req.body;
  try {
    const newRequest = new MatchRequest({
      sender: senderId,
      receiver: receiverId,
      message,
      status: 'pending'
    });
    await newRequest.save();
    res.status(200).json({ message: "Match request sent" });
  } catch (err) {
    console.error("Error sending match request:", err);
    res.status(500).json({ message: "Error sending match request" });
  }
};

// Accept a match request
let acceptRequest = async (req, res) => {
  let requestId = req.params.id;

  try {
    let match = await MatchRequest.findById(requestId);
    if (!match) {
      return res.status(404).json({ message: "Request not found" });
    }

    match.status = "accepted";
    await match.save();
    res.status(200).json({ message: "Match request accepted!" });
  } catch (error) {
    console.error("Error accepting match request:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Decline a match request
let declineRequest = async (req, res) => {
  let requestId = req.params.id;
  try {
    let match = await MatchRequest.findById(requestId);
    if (!match) {
      return res.status(404).json({ message: "Request not found" });
    }

    match.status = 'rejected';
    await match.save();
    res.status(200).json({ message: "Match request declined!" });
  } catch (error) {
    console.error("Error declining match request:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all accepted matches for a user
let acceptedMatches = async (req, res) => {
  let userId = req.params.id;
  try {
    const matches = await MatchRequest.find({
      $or: [{ sender: userId }, { receiver: userId }],
      status: "accepted"
    }).populate("sender receiver", "name email role").select("-message");

    res.status(200).json({ matches });
  } catch (error) {
    console.error("Error fetching match requests:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  findMatch,
  sendMatchRequest,
  acceptRequest,
  declineRequest,
  acceptedMatches
};
