const mongoose = require('mongoose');

// Define a schema for a date entry with week dates and their inputs
const dateEntrySchema = new mongoose.Schema({
  weekDates: [
    {
      date: { type: String, required: true },   // Store date as Date type
      time: { type: String, required: true },  // Store time as String
      description: { type: String, required: true }, // Store description
      coach: { type: String }, // Store coach name
      terrin: { type: String }, // Store terrin
      natif: { type: String }, // Store natif
    }
  ],
  role: { type: String } // Store role at the top level
});

const DateEntry = mongoose.model('DateEntry', dateEntrySchema);

module.exports = DateEntry;
