import React, { useState, useRef } from 'react';
import { ClipboardCheck, Plus, Edit, Trash2, Upload, Download, FileText, Eye, FileDown } from 'lucide-react';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';

interface Evaluation {
  id: number;
  candidateName: string;
  courseName: string;
  courseType: string;
  location: string;
  duration: string;
  date: string;
  status: string;
  remark: string;
  marks: number;
}

interface Transcription {
  id: number;
  candidateName: string;
  courseName: string;
  date: string;
  content: string;
}

const Evaluation: React.FC = () => {
  const [evaluations, setEvaluations] = useState<Evaluation[]>([
    { id: 1, candidateName: 'John Doe', courseName: 'Introduction to Programming', courseType: 'Technical', location: 'Online', duration: '4 weeks', date: '2024-03-15', status: 'Completed', remark: 'Excellent performance', marks: 85 },
    { id: 2, candidateName: 'Jane Smith', courseName: 'Advanced Web Development', courseType: 'Technical', location: 'In-person', duration: '8 weeks', date: '2024-03-20', status: 'In Progress', remark: 'Good progress so far', marks: 92 },
  ]);

  const [newEvaluation, setNewEvaluation] = useState<Omit<Evaluation, 'id' | 'marks'>>({
    candidateName: '',
    courseName: '',
    courseType: '',
    location: '',
    duration: '',
    date: '',
    status: '',
    remark: '',
  });

  const [transcriptions, setTranscriptions] = useState<Transcription[]>([]);
  const [newTranscription, setNewTranscription] = useState<Omit<Transcription, 'id'>>({
    candidateName: '',
    courseName: '',
    date: '',
    content: '',
  });
  const [previewTranscription, setPreviewTranscription] = useState<Transcription | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddEvaluation = () => {
    const evaluationWithMarks = { ...newEvaluation, marks: 0, id: Date.now() };
    setEvaluations([...evaluations, evaluationWithMarks]);
    setNewEvaluation({
      candidateName: '',
      courseName: '',
      courseType: '',
      location: '',
      duration: '',
      date: '',
      status: '',
      remark: '',
    });
  };

  const handleDeleteEvaluation = (id: number) => {
    setEvaluations(evaluations.filter(evaluation => evaluation.id !== id));
  };

  const handleAddTranscription = () => {
    const transcription = { ...newTranscription, id: Date.now() };
    setTranscriptions([...transcriptions, transcription]);
    setNewTranscription({ candidateName: '', courseName: '', date: '', content: '' });
  };

  const handlePreviewTranscription = (transcription: Transcription) => {
    setPreviewTranscription(transcription);
  };

  const handleGeneratePDF = (transcription: Transcription) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Transcription', 105, 15, { align: 'center' });
    doc.setFontSize(12);
    doc.text(`Candidate: ${transcription.candidateName}`, 20, 30);
    doc.text(`Course: ${transcription.courseName}`, 20, 40);
    doc.text(`Date: ${transcription.date}`, 20, 50);
    doc.setFontSize(10);
    const splitContent = doc.splitTextToSize(transcription.content, 170);
    doc.text(splitContent, 20, 70);
    doc.save(`transcription_${transcription.candidateName}_${transcription.date}.pdf`);
  };

  const handleBulkUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet) as Omit<Evaluation, 'id'>[];
        
        const newEvaluations = jsonData.map((item) => ({
          ...item,
          id: Date.now() + Math.random(),
          marks: Number(item.marks),
        }));

        setEvaluations([...evaluations, ...newEvaluations]);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleDownloadSampleExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet([
      {
        'Candidate Name': 'John Doe',
        'Course Name': 'Sample Course',
        'Course Type': 'Technical',
        'Location': 'Online',
        'Duration': '4 weeks',
        'Date': '2024-03-15',
        'Status': 'Completed',
        'Remark': 'Excellent',
        'Marks': 85
      }
    ]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sample');
    XLSX.writeFile(workbook, 'sample_evaluation_upload.xlsx');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Evaluation Management</h1>
      
      {/* New Evaluation Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New Evaluation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Candidate Name"
            className="border p-2 rounded"
            value={newEvaluation.candidateName}
            onChange={(e) => setNewEvaluation({ ...newEvaluation, candidateName: e.target.value })}
          />
          <input
            type="text"
            placeholder="Course Name"
            className="border p-2 rounded"
            value={newEvaluation.courseName}
            onChange={(e) => setNewEvaluation({ ...newEvaluation, courseName: e.target.value })}
          />
          <input
            type="text"
            placeholder="Course Type"
            className="border p-2 rounded"
            value={newEvaluation.courseType}
            onChange={(e) => setNewEvaluation({ ...newEvaluation, courseType: e.target.value })}
          />
          <input
            type="text"
            placeholder="Location"
            className="border p-2 rounded"
            value={newEvaluation.location}
            onChange={(e) => setNewEvaluation({ ...newEvaluation, location: e.target.value })}
          />
          <input
            type="text"
            placeholder="Duration"
            className="border p-2 rounded"
            value={newEvaluation.duration}
            onChange={(e) => setNewEvaluation({ ...newEvaluation, duration: e.target.value })}
          />
          <input
            type="date"
            placeholder="Date"
            className="border p-2 rounded"
            value={newEvaluation.date}
            onChange={(e) => setNewEvaluation({ ...newEvaluation, date: e.target.value })}
          />
          <input
            type="text"
            placeholder="Status"
            className="border p-2 rounded"
            value={newEvaluation.status}
            onChange={(e) => setNewEvaluation({ ...newEvaluation, status: e.target.value })}
          />
          <input
            type="text"
            placeholder="Remark"
            className="border p-2 rounded"
            value={newEvaluation.remark}
            onChange={(e) => setNewEvaluation({ ...newEvaluation, remark: e.target.value })}
          />
        </div>
        <button
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
          onClick={handleAddEvaluation}
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Evaluation
        </button>
      </div>
      
      {/* Bulk Upload Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Bulk Upload Evaluations</h2>
        <div className="flex items-center space-x-4">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-5 h-5 mr-2" />
            Upload Excel File
          </button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept=".xlsx, .xls"
            onChange={handleBulkUpload}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
            onClick={handleDownloadSampleExcel}
          >
            <Download className="w-5 h-5 mr-2" />
            Download Sample Excel
          </button>
        </div>
      </div>

      {/* Evaluations Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remark</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marks</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {evaluations.map((evaluation) => (
              <tr key={evaluation.id}>
                <td className="px-6 py-4 whitespace-nowrap">{evaluation.candidateName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{evaluation.courseName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{evaluation.courseType}</td>
                <td className="px-6 py-4 whitespace-nowrap">{evaluation.location}</td>
                <td className="px-6 py-4 whitespace-nowrap">{evaluation.duration}</td>
                <td className="px-6 py-4 whitespace-nowrap">{evaluation.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{evaluation.status}</td>
                <td className="px-6 py-4 whitespace-nowrap">{evaluation.remark}</td>
                <td className="px-6 py-4 whitespace-nowrap">{evaluation.marks}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:text-blue-900 mr-2">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button className="text-red-600 hover:text-red-900" onClick={() => handleDeleteEvaluation(evaluation.id)}>
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Existing code for transcription generation */}
      {/* ... */}
    </div>
  );
};

export default Evaluation;