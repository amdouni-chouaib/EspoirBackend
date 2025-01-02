const mongoose = require('mongoose');

const commandeSchema = new mongoose.Schema({
  nomProduit: { type: String, required: true },
  prix: { type: Number, required: true },
  quantite: { type: Number, required: true },
  confirmation: { type: Boolean, default: false },
  nomParent: { type: String, required: true },
  tel: { type: String, required: true },


});

const Commande = mongoose.model('Commande', commandeSchema);

module.exports = Commande;