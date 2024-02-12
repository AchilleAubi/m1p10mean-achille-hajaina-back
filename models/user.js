const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Enter a username']
    },
    emplois: [{
      nom: {
        type: String,
        required: [true, 'Enter a username']
      }
    }],
    pays: {
      type: String,
      default: 'Madagascar'
    },
    adresse: {
      type: String,
      default: 'Antanety LOT IVD 34 Q'
    },
    phone: {
      type: String,
      default: '1234567890'
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
    }
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