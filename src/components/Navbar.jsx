import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { LayoutDashboard, UserPlus, Users, Sparkles, Menu, X } from 'lucide-react';
import { useEmployees } from '../context/EmployeeContext';

const Navbar = () => {
  const { employees } = useEmployees();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="custom-navbar">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between">
          {/* Brand Logo & Title */}
          <Link to="/" className="d-flex align-items-center text-decoration-none gap-3">
            <div className="brand-icon-wrapper">
              <Users size={22} strokeWidth={2.3} />
            </div>
            <div>
              <div className="d-flex align-items-center gap-2">
                <h1 className="brand-title">WorkPulse</h1>
                <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-2 py-0 fw-semibold" style={{ fontSize: '0.68rem' }}>
                  v2.5
                </span>
              </div>
              <span className="brand-subtitle">Enterprise Directory & Dashboard</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="d-none d-md-flex align-items-center gap-3">
            <NavLink
              to="/"
              className={({ isActive }) => `nav-pill-link ${isActive ? 'active' : ''}`}
              id="nav-home-link"
              title="Home (Employee Dashboard)"
              end
            >
              <LayoutDashboard size={18} />
              <span>Home</span>
              <span className="nav-badge ms-1">{employees.length}</span>
            </NavLink>

            <NavLink
              to="/employee-form"
              className={({ isActive }) => `nav-pill-link ${isActive ? 'active' : ''}`}
              id="nav-employee-form-link"
              title="Employee Registration Form"
            >
              <UserPlus size={18} />
              <span>Employee Form</span>
            </NavLink>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="d-flex d-md-none align-items-center gap-2">
            <button
              className="btn btn-light border p-2 rounded-3"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="d-md-none pt-3 mt-2 border-top animate-fade-in">
            <div className="d-flex flex-column gap-2">
              <NavLink
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) => `nav-pill-link w-100 ${isActive ? 'active' : ''}`}
                end
              >
                <LayoutDashboard size={18} />
                <span>Home</span>
                <span className="nav-badge ms-auto">{employees.length}</span>
              </NavLink>

              <NavLink
                to="/employee-form"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) => `nav-pill-link w-100 ${isActive ? 'active' : ''}`}
              >
                <UserPlus size={18} />
                <span>Employee Form</span>
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
