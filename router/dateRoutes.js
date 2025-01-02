const express = require('express');
const router = express.Router();
const {
  createDateEntry,
  getAllDateEntries,
  getDateEntryById,
  updateDateEntry,
  deleteDateEntry
} = require('../Controller/dateController');

// Define routes and their handlers
router.post('/dateentry', createDateEntry); // Create a new set of date entries
router.get('/alldates', getAllDateEntries); // Get all date entries
router.get('/date/:id', getDateEntryById); // Get a single date entry by ID
router.put('/dateupdate/:id', updateDateEntry); // Update a date entry by ID
router.delete('/datedelete/:id', deleteDateEntry); // Delete a date entry by ID

module.exports = router;
