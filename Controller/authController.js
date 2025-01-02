const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../model/User');
const { upload } = require('../middle/lol');

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

    // Generate JWT token
    const token = jwt.sign({ user: player }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const signup = async (req, res) => {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.motdepasse, 10);

    // Create a new user instance
    const user = new User({
      nometprenomjoueur: req.body.nometprenomjoueur,
      datedenaissance: req.body.datedenaissance,
      specialite: req.body.specialite,
      preparationphy: req.body.preparationphy,
      entrainementspe: req.body.entrainementspe,
      poste: req.body.poste,
      picture: req.file.path,
      ecoleprim: req.body.ecoleprim,
      nometprenomparent: req.body.nometprenomparent,
      mobile: req.body.mobile,
      email: req.body.email,
      postedetravaille: req.body.postedetravaille,
      motdepasse: hashedPassword,
      role: req.body.role || 'user' // Default role if not provided
    });

    // Save the user to the database
    await user.save();

    // Respond with success message
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: error.message });
  }
};

// Upload user profile picture
const uploadPicture = (req, res) => {
  res.status(200).json({ message: 'Picture uploaded successfully', filePath: req.file.path });
};

module.exports = {
  login,
  signup,
  uploadPicture,
};
