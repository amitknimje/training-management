const express = require('express');
const router = express.Router();
const Candidate = require('../models/Candidate');

// Get all candidates
router.get('/', async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new candidate
router.post('/', async (req, res) => {
  const candidate = new Candidate({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone
  });

  try {
    const newCandidate = await candidate.save();
    res.status(201).json(newCandidate);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a candidate
router.patch('/:id', async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (req.body.name) candidate.name = req.body.name;
    if (req.body.email) candidate.email = req.body.email;
    if (req.body.phone) candidate.phone = req.body.phone;
    
    const updatedCandidate = await candidate.save();
    res.json(updatedCandidate);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a candidate
router.delete('/:id', async (req, res) => {
  try {
    await Candidate.findByIdAndDelete(req.params.id);
    res.json({ message: 'Candidate deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;