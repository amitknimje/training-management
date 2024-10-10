import React from 'react';
import { Users, MapPin, BookOpen, Award } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<Users className="w-8 h-8" />} title="Total Candidates" value="1,234" />
        <StatCard icon={<MapPin className="w-8 h-8" />} title="Training Locations" value="42" />
        <StatCard icon={<BookOpen className="w-8 h-8" />} title="Active Courses" value="18" />
        <StatCard icon={<Award className="w-8 h-8" />} title="Certifications Issued" value="987" />
      </div>
    </div>
  );
};

const StatCard: React.FC<{ icon: React.ReactNode; title: string; value: string }> = ({ icon, title, value }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center mb-4">
      <div className="bg-blue-100 p-3 rounded-full mr-4">{icon}</div>
      <h2 className="text-xl font-semibold">{title}</h2>
    </div>
    <p className="text-3xl font-bold text-blue-600">{value}</p>
  </div>
);

export default Dashboard;