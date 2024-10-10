import React, { useState } from 'react';
import { BookOpen, Plus, Edit, Trash2 } from 'lucide-react';

interface Course {
  id: number;
  name: string;
  level: string;
  duration: string;
}

const CourseManagement: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: 'Introduction to Programming', level: 'Beginner', duration: '4 weeks' },
    { id: 2, name: 'Advanced Web Development', level: 'Advanced', duration: '8 weeks' },
  ]);

  const [newCourse, setNewCourse] = useState<Omit<Course, 'id'>>({ name: '', level: '', duration: '' });

  const handleAddCourse = () => {
    setCourses([...courses, { ...newCourse, id: Date.now() }]);
    setNewCourse({ name: '', level: '', duration: '' });
  };

  const handleDeleteCourse = (id: number) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Course Management</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New Course</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Course Name"
            className="border p-2 rounded"
            value={newCourse.name}
            onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
          />
          <select
            className="border p-2 rounded"
            value={newCourse.level}
            onChange={(e) => setNewCourse({ ...newCourse, level: e.target.value })}
          >
            <option value="">Select Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
          <input
            type="text"
            placeholder="Duration (e.g., 4 weeks)"
            className="border p-2 rounded"
            value={newCourse.duration}
            onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
          />
        </div>
        <button
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
          onClick={handleAddCourse}
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Course
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {courses.map((course) => (
              <tr key={course.id}>
                <td className="px-6 py-4 whitespace-nowrap">{course.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{course.level}</td>
                <td className="px-6 py-4 whitespace-nowrap">{course.duration}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:text-blue-900 mr-2">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button className="text-red-600 hover:text-red-900" onClick={() => handleDeleteCourse(course.id)}>
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

export default CourseManagement;