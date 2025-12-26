import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  phone: {
    type: String,
    trim: true
  },
  state: {
    type: String,
    enum: ['TN', 'KL'],
    default: 'TN'
  },
  farmSize: {
    type: String,
    trim: true
  },
  mainCrops: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// ⚠️ WARNING: Storing passwords in plain text - INSECURE!
// Method to compare password (plain text comparison)
userSchema.methods.comparePassword = async function(candidatePassword) {
  return candidatePassword === this.password;
};

const User = mongoose.model('User', userSchema);

export default User;
