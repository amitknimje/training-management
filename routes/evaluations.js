const express = require('express');
const router = express.Router();
const Evaluation = require('../models/Evaluation');

// Get all evaluations
router.get('/', async (req, res) => {
  try {
    const evaluations = await Evaluation.find().populate('candidateId').populate('courseId');
    res.json(evaluations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new evaluation
router.post('/', async (req, res) => {
  const evaluation = new Evaluation({
    candidateId: req.body.candidateId,
    courseId: req.body.courseId,
    date: req.body.date,
    marks: req.body.marks,
    status: req.body.status,
    remark: req.body.remark
  });

  try {
    const newEvaluation = await evaluation.save();
    res.status(201).json(newEvaluation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an evaluation
router.patch('/:id', async (req, res) => {
  try {
    const evaluation = await Evaluation.findById(req.params.id);
    if (req.body.candidateId) evaluation.candidateId = req.body.candidateId;
    if (req.body.courseId) evaluation.courseId = req.body.courseId;
    if (req.body.date) evaluation.date = req.body.date;
    if (req.body.marks) evaluation.marks = req.body.marks;
    if (req.body.status) evaluation.status = req.body.status;
    if (req.body.remark) evaluation.remark = req.body.remark;
    
    const updatedEvaluation = await evaluation.save();
    res.json(updatedEvaluation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an evaluation
router.delete('/:id', async (req, res) => {
  try {
    await Evaluation.findByIdAndDelete(req.params.id);
    res.json({ message: 'Evaluation deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;