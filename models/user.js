const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Enter a username']
    },
    emplois: [{
      Categorie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categorie'
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
    image: {
      type: String,
      default: 'user.png'
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
    active: {
      type: Boolean,
      default: true
    },
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