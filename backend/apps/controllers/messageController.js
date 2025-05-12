const express = require("express")
const Message = require("../models/message")
const mongoose = require("mongoose")

let sendMessage = async(req, res) => {
  const {senderId, receiverId, content} = req.body

  try{
    let newMessage = new Message({
      sender: senderId,
      receiver: receiverId,
      content
    })

    await newMessage.save()
    res.status(201).json({message: "Message sent successfully"})
  } catch(error){
    console.log("Send message error: ", error)
    res.status(500).json({message: "server error"})
  }
}

let getConversation = async(req, res) => {
  const {user1Id, user2Id} = req.params

  try{
    const messages = await Message.find({
      $or: [
        {sender: user1Id, receiver: user2Id},
        {sender: user2Id, receiver: user1Id}
      ]
    }).sort({createdAt: 1})

    res.status(200).json({messages})
  } catch (error) {
    console.error('Get conversation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

let getLatestMessages = async(req, res) => {
  const {userId} = req.params

  try{
    const messages = await Message.aggregate([
      {
        $match: {
          $or: [
            { sender: new mongoose.Types.ObjectId(userId) },
            { receiver: new mongoose.Types.ObjectId(userId) }
          ]
        }
      },
      {
        $sort: { createdAt: -1}
      },
      {
        $group: {
          _id: {
            sender: "$sender",
            receiver: "$receiver"
          },
          latestMessage: { $first: "$$ROOT"}
        }
      }
    ])

    res.status(200).json({messages: messages.map(m=>m.latestMessage)})
  } catch (error) {
    console.error('Get latest messages error:', error);
    res.status(500).json({ message: 'Server error' });
}
}

module.exports = {sendMessage, getConversation, getLatestMessages}