const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ["mentor", "learner", "both"]
  },
  skillsNeeded: [{
    type: String
  }],
  skillsOffered: [{
    type: String
  }],
  matches: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message"
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model("User", userSchema, "users");
