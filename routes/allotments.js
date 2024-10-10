const express = require('express');
const router = express.Router();
const Allotment = require('../models/Allotment');

// Get all allotments
router.get('/', async (req, res) => {
  try {
    const allotments = await Allotment.find().populate('candidateId').populate('courseId');
    res.json(allotments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new allotment
router.post('/', async (req, res) => {
  const allotment = new Allotment({
    candidateId: req.body.candidateId,
    courseId: req.body.courseId,
    startDate: req.body.startDate,
    endDate: req.body.endDate
  });

  try {
    const newAllotment = await allotment.save();
    res.status(201).json(newAllotment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an allotment
router.patch('/:id', async (req, res) => {
  try {
    const allotment = await Allotment.findById(req.params.id);
    if (req.body.candidateId) allotment.candidateId = req.body.candidateId;
    if (req.body.courseId) allotment.courseId = req.body.courseId;
    if (req.body.startDate) allotment.startDate = req.body.startDate;
    if (req.body.endDate) allotment.endDate = req.body.endDate;
    
    const updatedAllotment = await allotment.save();
    res.json(updatedAllotment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an allotment
router.delete('/:id', async (req, res) => {
  try {
    await Allotment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Allotment deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;