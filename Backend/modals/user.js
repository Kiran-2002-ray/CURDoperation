const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true, 
    minlength: 3,
    maxlength: 30,
  },

  email: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique as well
    trim: true,
    lowercase: true, // Convert email to lowercase
    match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'Please enter a valid email address'],  
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
  },

  phone: {
    type: String, 
    required: true,
    trim: true,
    match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number'],
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ClientModal = mongoose.model("client", ClientSchema);

module.exports = ClientModal;
