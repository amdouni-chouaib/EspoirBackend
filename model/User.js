const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nometprenomjoueur: { type: String, required: true },
  datedenaissance: { type: Date, required: true },
  specialite: { type: String, required: true },
  preparationphy: { type: String },
  entrainementspe: { type: String },
  poste: { type: String },
  ecoleprim: { type: String },
  nometprenomparent: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  postedetravaille: { type: String },
  motdepasse: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
