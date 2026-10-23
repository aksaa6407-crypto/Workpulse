import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import EmployeeForm from './pages/EmployeeForm';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="app-container">
      {/* Top Navbar with Home and Employee form links */}
      <Navbar />

      {/* Main Content Area */}
      <main className="main-content">
        <Routes>
          {/* Home and Dashboard are both the same page */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Employee Form Route */}
          <Route path="/employee-form" element={<EmployeeForm />} />

          {/* Catch-all 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
