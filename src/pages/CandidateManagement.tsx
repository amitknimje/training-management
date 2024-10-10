import React, { useState } from 'react';
import { Users, Plus, Edit, Trash2, FileText, Eye, FileDown } from 'lucide-react';
import { jsPDF } from 'jspdf';

interface Candidate {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface Transcription {
  id: number;
  candidateId: number;
  content: string;
  date: string;
}

const CandidateManagement: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210' },
  ]);

  const [newCandidate, setNewCandidate] = useState<Omit<Candidate, 'id'>>({ name: '', email: '', phone: '' });
  const [transcriptions, setTranscriptions] = useState<Transcription[]>([]);
  const [newTranscription, setNewTranscription] = useState<Omit<Transcription, 'id'>>({
    candidateId: 0,
    content: '',
    date: '',
  });
  const [previewTranscription, setPreviewTranscription] = useState<Transcription | null>(null);

  const handleAddCandidate = () => {
    setCandidates([...candidates, { ...newCandidate, id: Date.now() }]);
    setNewCandidate({ name: '', email: '', phone: '' });
  };

  const handleDeleteCandidate = (id: number) => {
    setCandidates(candidates.filter(candidate => candidate.id !== id));
  };

  const handleAddTranscription = () => {
    if (newTranscription.candidateId && newTranscription.content && newTranscription.date) {
      setTranscriptions([...transcriptions, { ...newTranscription, id: Date.now() }]);
      setNewTranscription({ candidateId: 0, content: '', date: '' });
    }
  };

  const handlePreviewTranscription = (transcription: Transcription) => {
    setPreviewTranscription(transcription);
  };

  const handleGeneratePDF = (transcription: Transcription) => {
    const candidate = candidates.find(c => c.id === transcription.candidateId);
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Transcription', 105, 15, { align: 'center' });
    doc.setFontSize(12);
    doc.text(`Candidate: ${candidate?.name || 'Unknown'}`, 20, 30);
    doc.text(`Date: ${transcription.date}`, 20, 40);
    doc.setFontSize(10);
    const splitContent = doc.splitTextToSize(transcription.content, 170);
    doc.text(splitContent, 20, 50);
    doc.save(`transcription_${candidate?.name || 'unknown'}_${transcription.date}.pdf`);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Candidate Management</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New Candidate</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="border p-2 rounded"
            value={newCandidate.name}
            onChange={(e) => setNewCandidate({ ...newCandidate, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded"
            value={newCandidate.email}
            onChange={(e) => setNewCandidate({ ...newCandidate, email: e.target.value })}
          />
          <input
            type="tel"
            placeholder="Phone"
            className="border p-2 rounded"
            value={newCandidate.phone}
            onChange={(e) => setNewCandidate({ ...newCandidate, phone: e.target.value })}
          />
        </div>
        <button
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
          onClick={handleAddCandidate}
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Candidate
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {candidates.map((candidate) => (
              <tr key={candidate.id}>
                <td className="px-6 py-4 whitespace-nowrap">{candidate.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{candidate.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{candidate.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:text-blue-900 mr-2">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button className="text-red-600 hover:text-red-900" onClick={() => handleDeleteCandidate(candidate.id)}>
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Generate Transcription</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            className="border p-2 rounded"
            value={newTranscription.candidateId}
            onChange={(e) => setNewTranscription({ ...newTranscription, candidateId: Number(e.target.value) })}
          >
            <option value="">Select Candidate</option>
            {candidates.map((candidate) => (
              <option key={candidate.id} value={candidate.id}>{candidate.name}</option>
            ))}
          </select>
          <input
            type="date"
            className="border p-2 rounded"
            value={newTranscription.date}
            onChange={(e) => setNewTranscription({ ...newTranscription, date: e.target.value })}
          />
          <textarea
            className="border p-2 rounded col-span-2"
            rows={4}
            placeholder="Transcription content"
            value={newTranscription.content}
            onChange={(e) => setNewTranscription({ ...newTranscription, content: e.target.value })}
          ></textarea>
        </div>
        <button
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center"
          onClick={handleAddTranscription}
        >
          <FileText className="w-5 h-5 mr-2" />
          Generate Transcription
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transcriptions.map((transcription) => (
              <tr key={transcription.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {candidates.find(c => c.id === transcription.candidateId)?.name || 'Unknown'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{transcription.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="text-blue-600 hover:text-blue-900 mr-2"
                    onClick={() => handlePreviewTranscription(transcription)}
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <button
                    className="text-green-600 hover:text-green-900"
                    onClick={() => handleGeneratePDF(transcription)}
                  >
                    <FileDown className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {previewTranscription && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Transcription Preview</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  {previewTranscription.content}
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  id="ok-btn"
                  className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  onClick={() => setPreviewTranscription(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateManagement;