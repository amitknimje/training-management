const express = require('express');
const router = express.Router();
const Location = require('../models/Location');

// Get all locations
router.get('/', async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new location
router.post('/', async (req, res) => {
  const location = new Location({
    name: req.body.name,
    address: req.body.address,
    capacity: req.body.capacity
  });

  try {
    const newLocation = await location.save();
    res.status(201).json(newLocation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a location
router.patch('/:id', async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (req.body.name) location.name = req.body.name;
    if (req.body.address) location.address = req.body.address;
    if (req.body.capacity) location.capacity = req.body.capacity;
    
    const updatedLocation = await location.save();
    res.json(updatedLocation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a location
router.delete('/:id', async (req, res) => {
  try {
    await Location.findByIdAndDelete(req.params.id);
    res.json({ message: 'Location deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;