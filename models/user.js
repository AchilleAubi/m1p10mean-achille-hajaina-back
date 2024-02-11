const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Enter a username']
    },
    email: {
      type: String
    },
    password: {
      type: String,
      required: [true, 'Enter a password']
    },
    role: {
      type: String,
      default: 'client'
    },
    salaire: [{
      date: {
        type: Date,
        default: Date.now
      },
      salaire: {
        type: Number,
        default: 0
      }
    }],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;