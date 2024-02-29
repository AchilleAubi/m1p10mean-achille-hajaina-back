const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const asyncHandler = require('express-async-handler');

let invalidToken = [];

const authController = {
  login: asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id, user.role);
      res.json({ _id: user._id, username: user.username, role: user.role, token, email: user.email, pays: user.pays, adresse: user.adresse, emplois: user.emplois, salaire: user.salaire, image: user.image });
    } else {
      res.status(401);
      throw new Error('Invalid username or password');
    }
  }),

  register: asyncHandler(async (req, res) => {
    const { username, password, role, email } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(400);
      throw new Error('Username is already taken');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      username,
      password: hashedPassword,
      email,
      role: role || 'client'
    });

    const token = generateToken(newUser._id, newUser.role);
    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      role: newUser.role,
      token
    });
  }),

  logout: asyncHandler(async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    invalidToken.push(token);
    res.json({ message: 'Déconnexion réussie' });
  }),

  getUserAdmin: asyncHandler(async (req, res) => {
    try {
      const user = await User.find({ role: req.body.role });
      res.status(200).json(user);
    } catch (error) {
      res.status(500);
      console.log(error);
      throw new error(error.message);
    }
  }),

  getUserClient: asyncHandler(async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.id });
      res.status(200).json(user);
    } catch (error) {
      res.status(500);
      console.log(error);
      throw new error(error.message);
    }
  }),

  createAdmin: asyncHandler(async (req, res) => {
    try {
      const { pays, adresse, phone, username, email, password, role, emplois, salaire, image } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const data = {
        pays: pays,
        adresse: adresse,
        phone: phone,
        username: username,
        email: email,
        password: hashedPassword,
        role: role,
        emplois: emplois,
        salaire: salaire,
        image: image
      };
      const user = await User.create(data);
      res.status(200).json(user);
    } catch (error) {
      res.status(500);
      console.log(error);
      throw new error(error.message);
    }
  })
}

generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
}

module.exports = authController;