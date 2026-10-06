import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import Assignments from './pages/Assignments';
import Exams from './pages/Exams';
import Schedule from './pages/Schedule';
import Notes from './pages/Notes';
import EventsNews from './pages/EventsNews';
import SmartScheduleGenerator from './pages/SmartScheduleGenerator';
import AcademicProgress from './pages/AcademicProgress';
import Profile from './pages/Profile';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes (تتطلب تسجيل دخول) */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="flex min-h-screen bg-black text-zinc-100">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                  <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                  <main className="flex-1">
                    <Routes>
                      <Route path="/" element={<Navigate to="/dashboard" replace />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/courses" element={<Courses />} />
                      <Route path="/assignments" element={<Assignments />} />
                      <Route path="/exams" element={<Exams />} />
                      <Route path="/schedule" element={<Schedule />} />
                      <Route path="/smart-generator" element={<SmartScheduleGenerator />} />
                      <Route path="/notes" element={<Notes />} />
                      <Route path="/events-news" element={<EventsNews />} />
                      <Route path="/academic-progress" element={<AcademicProgress />} />
                      <Route path="/profile" element={<Profile />} />
                    </Routes>
                  </main>
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;