import React, { useState } from 'react';
import { Calendar, Plus, Edit, Trash2 } from 'lucide-react';

interface Allotment {
  id: number;
  candidateName: string;
  courseName: string;
  startDate: string;
  endDate: string;
}

const Allotment: React.FC = () => {
  const [allotments, setAllotments] = useState<Allotment[]>([
    { id: 1, candidateName: 'John Doe', courseName: 'Introduction to Programming', startDate: '2024-03-01', endDate: '2024-03-28' },
    { id: 2, candidateName: 'Jane Smith', courseName: 'Advanced Web Development', startDate: '2024-04-01', endDate: '2024-05-26' },
  ]);

  const [newAllotment, setNewAllotment] = useState<Omit<Allotment, 'id'>>({
    candidateName: '',
    courseName: '',
    startDate: '',
    endDate: '',
  });

  const handleAddAllotment = () => {
    setAllotments([...allotments, { ...newAllotment, id: Date.now() }]);
    setNewAllotment({ candidateName: '', courseName: '', startDate: '', endDate: '' });
  };

  const handleDeleteAllotment = (id: number) => {
    setAllotments(allotments.filter(allotment => allotment.id !== id));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Allotment</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New Allotment</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Candidate Name"
            className="border p-2 rounded"
            value={newAllotment.candidateName}
            onChange={(e) => setNewAllotment({ ...newAllotment, candidateName: e.target.value })}
          />
          <input
            type="text"
            placeholder="Course Name"
            className="border p-2 rounded"
            value={newAllotment.courseName}
            onChange={(e) => setNewAllotment({ ...newAllotment, courseName: e.target.value })}
          />
          <input
            type="date"
            placeholder="Start Date"
            className="border p-2 rounded"
            value={newAllotment.startDate}
            onChange={(e) => setNewAllotment({ ...newAllotment, startDate: e.target.value })}
          />
          <input
            type="date"
            placeholder="End Date"
            className="border p-2 rounded"
            value={newAllotment.endDate}
            onChange={(e) => setNewAllotment({ ...newAllotment, endDate: e.target.value })}
          />
        </div>
        <button
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
          onClick={handleAddAllotment}
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Allotment
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {allotments.map((allotment) => (
              <tr key={allotment.id}>
                <td className="px-6 py-4 whitespace-nowrap">{allotment.candidateName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{allotment.courseName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{allotment.startDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">{allotment.endDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:text-blue-900 mr-2">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button className="text-red-600 hover:text-red-900" onClick={() => handleDeleteAllotment(allotment.id)}>
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Allotment;