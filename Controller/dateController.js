const DateEntry = require('../model/dateEntrySchema');

// Create a new DateEntry
exports.createDateEntry = async (req, res) => {
  try {
    const dateEntry = new DateEntry(req.body);
    await dateEntry.save();
    res.status(201).json({ message: 'Date entry created successfully', data: dateEntry });
  } catch (error) {
    res.status(400).json({ message: 'Error creating date entry', error });
  }
};

// Get all DateEntries
exports.getAllDateEntries = async (req, res) => {
  try {
    const dateEntries = await DateEntry.find();
    res.status(200).json({ data: dateEntries });
  } catch (error) {
    res.status(400).json({ message: 'Error retrieving date entries', error });
  }
};

// Get a single DateEntry by ID
exports.getDateEntryById = async (req, res) => {
  try {
    const { id } = req.params;
    const dateEntry = await DateEntry.findById(id);

    if (!dateEntry) {
      return res.status(404).json({ message: 'Date entry not found' });
    }

    res.status(200).json({ data: dateEntry });
  } catch (error) {
    res.status(400).json({ message: 'Error retrieving date entry', error });
  }
};

// Update a DateEntry by ID
exports.updateDateEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedDateEntry = await DateEntry.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedDateEntry) {
      return res.status(404).json({ message: 'Date entry not found' });
    }

    res.status(200).json({ message: 'Date entry updated successfully', data: updatedDateEntry });
  } catch (error) {
    res.status(400).json({ message: 'Error updating date entry', error });
  }
};

// Delete a DateEntry by ID
exports.deleteDateEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDateEntry = await DateEntry.findByIdAndDelete(id);

    if (!deletedDateEntry) {
      return res.status(404).json({ message: 'Date entry not found' });
    }

    res.status(200).json({ message: 'Date entry deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting date entry', error });
  }
};