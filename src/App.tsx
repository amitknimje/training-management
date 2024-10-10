import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import LocationManagement from './pages/LocationManagement';
import CandidateManagement from './pages/CandidateManagement';
import CourseManagement from './pages/CourseManagement';
import Allotment from './pages/Allotment';
import Experts from './pages/Experts';
import Evaluation from './pages/Evaluation';
import UserManagement from './pages/UserManagement';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/locations" element={<LocationManagement />} />
            <Route path="/candidates" element={<CandidateManagement />} />
            <Route path="/courses" element={<CourseManagement />} />
            <Route path="/allotment" element={<Allotment />} />
            <Route path="/experts" element={<Experts />} />
            <Route path="/evaluation" element={<Evaluation />} />
            <Route path="/users" element={<UserManagement />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;