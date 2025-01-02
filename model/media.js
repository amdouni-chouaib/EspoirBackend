const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  pictures: [{ type: String }], // Array of picture file paths or URLs
  videos: [{ type: String }],   // Array of video file paths or URLs
  createdAt: { type: Date, default: Date.now }
});

const Media = mongoose.model('Media', mediaSchema);

module.exports = Media;
