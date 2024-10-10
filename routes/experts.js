const express = require('express');
const router = express.Router();
const Expert = require('../models/Expert');

// Get all experts
router.get('/', async (req, res) => {
  try {
    const experts = await Expert.find();
    res.json(experts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new expert
router.post('/', async (req, res) => {
  const expert = new Expert({
    name: req.body.name,
    specialization: req.body.specialization,
    experience: req.body.experience
  });

  try {
    const newExpert = await expert.save();
    res.status(201).json(newExpert);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an expert
router.patch('/:id', async (req, res) => {
  try {
    const expert = await Expert.findById(req.params.id);
    if (req.body.name) expert.name = req.body.name;
    if (req.body.specialization) expert.specialization = req.body.specialization;
    if (req.body.experience) expert.experience = req.body.experience;
    
    const updatedExpert = await expert.save();
    res.json(updatedExpert);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an expert
router.delete('/:id', async (req, res) => {
  try {
    await Expert.findByIdAndDelete(req.params.id);
    res.json({ message: 'Expert deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;