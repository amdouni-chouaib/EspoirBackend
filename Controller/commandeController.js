const Commande = require('../model/commande');

// Create a new commande
exports.createCommande = async (req, res) => {
  try {
    const commande = new Commande(req.body);
    await commande.save();
    res.status(201).json(commande);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all commandes
exports.getAllCommandes = async (req, res) => {
  try {
    const commandes = await Commande.find();
    res.status(200).json(commandes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single commande by ID
exports.getCommandeById = async (req, res) => {
  try {
    const commande = await Commande.findById(req.params.id);
    if (!commande) {
      return res.status(404).json({ message: 'Commande not found' });
    }
    res.status(200).json(commande);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a commande by ID
exports.updateCommande = async (req, res) => {
  try {
    const commande = await Commande.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!commande) {
      return res.status(404).json({ message: 'Commande not found' });
    }
    res.status(200).json(commande);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a commande by ID
exports.deleteCommande = async (req, res) => {
  try {
    const commande = await Commande.findByIdAndDelete(req.params.id);
    if (!commande) {
      return res.status(404).json({ message: 'Commande not found' });
    }
    res.status(200).json({ message: 'Commande deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};