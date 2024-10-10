import React, { useState } from 'react';
import { UserCheck, Plus, Edit, Trash2 } from 'lucide-react';

interface Expert {
  id: number;
  name: string;
  specialization: string;
  experience: number;
}

const Experts: React.FC = () => {
  const [experts, setExperts] = useState<Expert[]>([
    { id: 1, name: 'Dr. Jane Smith', specialization: 'Machine Learning', experience: 10 },
    { id: 2, name: 'Prof. John Doe', specialization: 'Web Development', experience: 15 },
  ]);

  const [newExpert, setNewExpert] = useState<Omit<Expert, 'id'>>({ name: '', specialization: '', experience: 0 });

  const handleAddExpert = () => {
    setExperts([...experts, { ...newExpert, id: Date.now() }]);
    setNewExpert({ name: '', specialization: '', experience: 0 });
  };

  const handleDeleteExpert = (id: number) => {
    setExperts(experts.filter(expert => expert.id !== id));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Expert Management</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New Expert</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="border p-2 rounded"
            value={newExpert.name}
            onChange={(e) => setNewExpert({ ...newExpert, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Specialization"
            className="border p-2 rounded"
            value={newExpert.specialization}
            onChange={(e) => setNewExpert({ ...newExpert, specialization: e.target.value })}
          />
          <input
            type="number"
            placeholder="Years of Experience"
            className="border p-2 rounded"
            value={newExpert.experience}
            onChange={(e) => setNewExpert({ ...newExpert, experience: parseInt(e.target.value) })}
          />
        </div>
        <button
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
          onClick={handleAddExpert}
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Expert
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialization</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience (Years)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {experts.map((expert) => (
              <tr key={expert.id}>
                <td className="px-6 py-4 whitespace-nowrap">{expert.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{expert.specialization}</td>
                <td className="px-6 py-4 whitespace-nowrap">{expert.experience}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:text-blue-900 mr-2">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button className="text-red-600 hover:text-red-900" onClick={() => handleDeleteExpert(expert.id)}>
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

export default Experts;