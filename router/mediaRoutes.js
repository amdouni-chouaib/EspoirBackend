const express = require('express');
const router = express.Router();
const upload = require('../config/upload'); // Adjust the path as needed
const mediaController = require('../Controller/mediaController'); // Adjust the path as needed

// Handle file uploads and media creation
router.post('/media', upload.fields([{ name: 'pictures', maxCount: 10 }, { name: 'videos', maxCount: 5 }]), mediaController.createMedia);

// CRUD operations
router.get('/media', mediaController.getAllMedia);
router.get('/getonemedia/:id', mediaController.getMediaById);
router.put('/updateonemedia/:id', upload.fields([{ name: 'pictures', maxCount: 10 }, { name: 'videos', maxCount: 5 }]), mediaController.updateMedia);
router.delete('/deleteonemedia/:id', mediaController.deleteMedia);

module.exports = router;
