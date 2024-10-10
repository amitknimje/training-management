const mongoose = require('mongoose');

const EvaluationSchema = new mongoose.Schema({
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  date: { type: Date, required: true },
  marks: { type: Number, required: true },
  status: { type: String, required: true },
  remark: { type: String },
});

module.exports = mongoose.model('Evaluation', EvaluationSchema);