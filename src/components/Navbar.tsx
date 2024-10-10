import React from 'react';
import { Link } from 'react-router-dom';
import { Home, MapPin, Users, BookOpen, Calendar, UserCheck, ClipboardCheck, UserCog } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="flex items-center">
            <Home className="w-5 h-5 mr-2" />
            <span className="font-bold text-lg">TMS</span>
          </Link>
          <div className="flex space-x-3">
            <NavLink to="/locations" icon={<MapPin className="w-4 h-4 mr-1" />} text="Locations" />
            <NavLink to="/candidates" icon={<Users className="w-4 h-4 mr-1" />} text="Candidates" />
            <NavLink to="/courses" icon={<BookOpen className="w-4 h-4 mr-1" />} text="Courses" />
            <NavLink to="/allotment" icon={<Calendar className="w-4 h-4 mr-1" />} text="Allotment" />
            <NavLink to="/experts" icon={<UserCheck className="w-4 h-4 mr-1" />} text="Experts" />
            <NavLink to="/evaluation" icon={<ClipboardCheck className="w-4 h-4 mr-1" />} text="Evaluation" />
            <NavLink to="/users" icon={<UserCog className="w-4 h-4 mr-1" />} text="Users" />
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink: React.FC<{ to: string; icon: React.ReactNode; text: string }> = ({ to, icon, text }) => (
  <Link to={to} className="flex items-center hover:bg-blue-700 px-2 py-1 rounded text-sm">
    {icon}
    <span>{text}</span>
  </Link>
);

export default Navbar;