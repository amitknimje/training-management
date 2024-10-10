import React, { useState } from 'react';
import { MapPin, Plus, Edit, Trash2 } from 'lucide-react';

interface Location {
  id: number;
  name: string;
  address: string;
  capacity: number;
}

const LocationManagement: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([
    { id: 1, name: 'Main Campus', address: '123 University Ave, City, State 12345', capacity: 500 },
    { id: 2, name: 'Downtown Center', address: '456 Business St, City, State 12345', capacity: 200 },
  ]);

  const [newLocation, setNewLocation] = useState<Omit<Location, 'id'>>({ name: '', address: '', capacity: 0 });

  const handleAddLocation = () => {
    setLocations([...locations, { ...newLocation, id: Date.now() }]);
    setNewLocation({ name: '', address: '', capacity: 0 });
  };

  const handleDeleteLocation = (id: number) => {
    setLocations(locations.filter(location => location.id !== id));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Location Management</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New Location</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Location Name"
            className="border p-2 rounded"
            value={newLocation.name}
            onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Address"
            className="border p-2 rounded"
            value={newLocation.address}
            onChange={(e) => setNewLocation({ ...newLocation, address: e.target.value })}
          />
          <input
            type="number"
            placeholder="Capacity"
            className="border p-2 rounded"
            value={newLocation.capacity}
            onChange={(e) => setNewLocation({ ...newLocation, capacity: parseInt(e.target.value) })}
          />
        </div>
        <button
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
          onClick={handleAddLocation}
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Location
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {locations.map((location) => (
              <tr key={location.id}>
                <td className="px-6 py-4 whitespace-nowrap">{location.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{location.address}</td>
                <td className="px-6 py-4 whitespace-nowrap">{location.capacity}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:text-blue-900 mr-2">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button className="text-red-600 hover:text-red-900" onClick={() => handleDeleteLocation(location.id)}>
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

export default LocationManagement;