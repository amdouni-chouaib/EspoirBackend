const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();
const multer = require('multer');

const path = require('path');

const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ storage: storage });
  
  exports.upload = upload;
// Function to handle player login
const login = async (req, res) => {
  try {
    const { email, motdepasse } = req.body;

    // Find player by email
    const player = await User.findOne({ email });
    if (!player) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare hashed passwords (using bcrypt)
    const isMatch = await bcrypt.compare(motdepasse, player.motdepasse);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token (replace 'your_secret_key' with a strong secret key)
    const token = jwt.sign({ user: player }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Set token expiration time (e.g., 1 hour)
    });

    res.status(200).json({ token }); // Send the JWT token in the response
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const signup = async (req, res) => {
  const {
    nometprenomjoueur,
    datedenaissance,
    specialite,
    preparationphy,
    entrainementspe,
    poste,
    ecoleprim,
    nometprenomparent,
    mobile,
    email,
    postedetravaille,
    motdepasse
  } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(motdepasse, 10);

    user = new User({
      nometprenomjoueur,
      datedenaissance,
      specialite,
      preparationphy,
      entrainementspe,
      poste,
      ecoleprim,
      nometprenomparent,
      mobile,
      email,
      postedetravaille,
      motdepasse: hashedPassword
    });

    await user.save();

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({ token, user: { id: user._id, email: user.email, nometprenomjoueur: user.nometprenomjoueur } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { signup,login };
