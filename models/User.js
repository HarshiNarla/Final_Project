const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  signupEmail: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  signupPassword: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  favoriteDestination: {
    type: String,
    required: true,
    trim: true
  }
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('signupPassword')) return next();
  this.signupPassword = await bcrypt.hash(this.signupPassword, parseInt(process.env.BCRYPT_SALT_ROUNDS));
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;