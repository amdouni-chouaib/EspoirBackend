const User = require('../model/User');
const bcrypt = require('bcryptjs');

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { nometprenomjoueur, datedenaissance, specialite, preparationphy, entrainementspe, poste, ecoleprim, nometprenomparent, mobile, email, postedetravaille, motdepasse, role } = req.body;

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(motdepasse, 10);

    const user = new User({
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
      motdepasse: hashedPassword,
      role
    });

    await user.save();
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  try {
    const { nometprenomjoueur, datedenaissance, specialite, preparationphy, entrainementspe, poste, ecoleprim, nometprenomparent, mobile, email, postedetravaille, motdepasse, role } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.nometprenomjoueur = nometprenomjoueur || user.nometprenomjoueur;
    user.datedenaissance = datedenaissance || user.datedenaissance;
    user.specialite = specialite || user.specialite;
    user.preparationphy = preparationphy || user.preparationphy;
    user.entrainementspe = entrainementspe || user.entrainementspe;
    user.poste = poste || user.poste;
    user.ecoleprim = ecoleprim || user.ecoleprim;
    user.nometprenomparent = nometprenomparent || user.nometprenomparent;
    user.mobile = mobile || user.mobile;
    user.email = email || user.email;
    user.postedetravaille = postedetravaille || user.postedetravaille;
    if (motdepasse) {
      user.motdepasse = await bcrypt.hash(motdepasse, 10);
    }
    user.role = role || user.role;

    await user.save();
    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(400).json({ message: 'Error updating user', error });
  }
};
// Update a userprofile
exports.updateUserP = async (req, res) => {
  try {
    const { nometprenomjoueur, mobile, email, motdepasse } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({message: 'User not found'});
    }
    console.log(user);
    
    user.nometprenomjoueur = nometprenomjoueur 
   
    user.mobile = mobile 
    user.email = email 
    if (motdepasse) {
      user.motdepasse = await bcrypt.hash(motdepasse, 10);
    }

    await user.save();
    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(400).json({ message: 'Error updating user', error });
  }
};
// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};
