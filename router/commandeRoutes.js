// routes/commande.routes.js
const express = require('express');
const commandeController = require('../Controller/commandeController');

const router = express.Router();

router.post('/createcommande/', commandeController.createCommande);
router.get('/getallcommandes/', commandeController.getAllCommandes);
router.get('/getcommande/:id', commandeController.getCommandeById);
router.put('/updatecommande/:id', commandeController.updateCommande);
router.delete('/deletecommande/:id', commandeController.deleteCommande);

module.exports = router;
