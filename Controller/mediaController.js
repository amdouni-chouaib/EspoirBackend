const Media = require('../model/media'); // Adjust the path as needed
const path = require('path');

// Create a new media entry
exports.createMedia = async (req, res) => {
  try {
    const { title, description } = req.body;
    const pictures = req.files.pictures ? req.files.pictures.map(file => file.path) : [];
    const videos = req.files.videos ? req.files.videos.map(file => file.path) : [];
    
    const newMedia = new Media({ title, description, pictures, videos });
    const savedMedia = await newMedia.save();
    res.status(201).json(savedMedia);
  } catch (error) {
    res.status(500).json({ message: 'Error creating media', error });
  }
};

// Get all media entries
exports.getAllMedia = async (req, res) => {
  try {
    const media = await Media.find();
    res.status(200).json(media);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching media', error });
  }
};

// Get a single media entry by ID
exports.getMediaById = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) return res.status(404).json({ message: 'Media not found' });
    res.status(200).json(media);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching media', error });
  }
};

// Update a media entry by ID
exports.updateMedia = async (req, res) => {
  try {
    const { title, description } = req.body;
    const pictures = req.files.pictures ? req.files.pictures.map(file => file.path) : [];
    const videos = req.files.videos ? req.files.videos.map(file => file.path) : [];
    
    const media = await Media.findByIdAndUpdate(req.params.id, { title, description, pictures, videos }, { new: true });
    if (!media) return res.status(404).json({ message: 'Media not found' });
    res.status(200).json(media);
  } catch (error) {
    res.status(500).json({ message: 'Error updating media', error });
  }
};

// Delete a media entry by ID
exports.deleteMedia = async (req, res) => {
  try {
    const media = await Media.findByIdAndDelete(req.params.id);
    if (!media) return res.status(404).json({ message: 'Media not found' });
    res.status(200).json({ message: 'Media deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting media', error });
  }
};
