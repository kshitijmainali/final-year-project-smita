// import mongoose from 'mongoose';
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
});

// export  mongoose.model('User', userSchema);
module.exports = mongoose.model('User', userSchema);
