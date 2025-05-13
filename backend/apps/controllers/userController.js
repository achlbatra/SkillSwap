let model = require("../models/user.js")
let express = require("express")
let bcrypt = require("bcrypt")

let registerUser = async (req, res) => {
  const { name, email, phone, password, role, skillsNeeded, skillsOffered } = req.body
  try {

    const existingUser = await model.find({ email })
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "User already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new model({
      name,
      email,
      phone,
      password: hashedPassword,
      role,
      skillsNeeded,
      skillsOffered
    })

    await newUser.save()
    res.status(201).json({ message: "User registered successfully" })
  } catch (error) {
    console.error("Error registering user:", error)
    res.status(500).json({ message: error.message })
  }
}


let login = async (req, res) => {
  const { email, upassword } = req.body;
  try {
    let existingUser = await model.findOne({ email });

    if (!existingUser) {
      return res.status(401).json({ message: "User does not exist!" });
    }

    const isMatch = await bcrypt.compare(upassword, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    // JWT Token generation
    const jwt = require("jsonwebtoken");
    const SECRET_KEY = process.env.SECRET_KEY;
    const token = jwt.sign(
      { id: existingUser._id, role: existingUser.role },
      process.env.SECRET_KEY,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      status: 1,
      message: "User logged in successfully",
      token, // 🔐 Include token here
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
      },
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: error.message });
  }
};



let getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await model.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
};


let updateUser = async (req, res) => {
  let userId = req.params.id;

  try {
    const user = await model.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const { name, phone, role, skillsNeeded, skillsOffered } = req.body;

    const updatedUser = await model.findByIdAndUpdate(
      userId,
      {
        name: name ?? user.name,
        phone: phone ?? user.phone,
        role: role ?? user.role,
        skillsNeeded: skillsNeeded ?? user.skillsNeeded,
        skillsOffered: skillsOffered ?? user.skillsOffered,
      },
      { new: true, runValidators: true }
    ).select("-password"); 

    res.status(200).json({ message: "Profile updated", user: updatedUser });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports={ registerUser, login, getUserById, updateUser }