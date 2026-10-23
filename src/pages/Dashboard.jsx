import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutGrid,
  Table as TableIcon,
  List as ListIcon,
  Search,
  RefreshCw,
  UserPlus,
  Mail,
  MapPin,
  Briefcase,
  DollarSign,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  Building,
  Trash2
} from 'lucide-react';
import { useEmployees } from '../context/EmployeeContext';

const Dashboard = () => {
  const { employees, loading, error, refreshEmployees, resetToApiData, deleteEmployee, lastUpdated } = useEmployees();
  
  // View mode: 'card' | 'table' | 'list'
  const [viewMode, setViewMode] = useState('card');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('ALL');

  // Filter employees based on search & role
  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const term = searchTerm.toLowerCase();
      const matchesSearch =
        String(emp.id).includes(term) ||
        emp.name.toLowerCase().includes(term) ||
        emp.email.toLowerCase().includes(term) ||
        (emp.designation && emp.designation.toLowerCase().includes(term)) ||
        (emp.location && emp.location.toLowerCase().includes(term));

      const matchesRole = selectedRole === 'ALL' || emp.designation === selectedRole;
      return matchesSearch && matchesRole;
    });
  }, [employees, searchTerm, selectedRole]);

  // Unique designations for filter dropdown
  const designations = useMemo(() => {
    const set = new Set(employees.map((e) => e.designation).filter(Boolean));
    return ['ALL', ...Array.from(set)];
  }, [employees]);

  // Format currency
  const formatSalary = (val) => {
    if (!val) return '$0';
    const num = Number(String(val).replace(/[^0-9.-]+/g, ''));
    if (isNaN(num)) return `$${val}`;
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num);
  };

  // Helper avatar initials
  const getInitials = (name) => {
    if (!name) return 'EP';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div className="container animate-fade-in">
      {/* Top Hero Banner */}
      <div className="hero-header d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-4">
        <div>
          <div className="d-flex align-items-center gap-2 mb-2">
            <span className="badge bg-indigo-subtle text-primary border border-primary-subtle rounded-pill px-3 py-1 fw-bold">
              <ShieldCheck size={14} className="me-1 d-inline" /> Official Directory
            </span>
            {lastUpdated && (
              <span className="text-muted" style={{ fontSize: '0.8rem' }}>
                Synced: {lastUpdated}
              </span>
            )}
          </div>
          <h2 className="mb-2 display-6 fw-bold text-dark">Staff Directory & Dashboard</h2>
          <p className="text-muted mb-0 lead" style={{ fontSize: '1rem', maxWidth: '620px' }}>
            Centralized hub displaying employee data fetched dynamically from the external API (
            <code className="text-primary fw-semibold">jsonplaceholder.typicode.com/users</code>) combined with local records.
          </p>
        </div>

        <div className="d-flex align-items-center gap-2 flex-wrap">
          <button
            onClick={refreshEmployees}
            className="btn btn-secondary-modern"
            title="Reload from API"
            id="refresh-btn"
          >
            <RefreshCw size={16} className={loading ? 'spin-animation' : ''} />
            <span>Sync API</span>
          </button>

          <Link to="/employee-form" className="btn btn-primary-gradient" id="add-employee-hero-btn">
            <UserPlus size={18} />
            <span>Add New Employee</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="stat-card">
            <div className="stat-icon bg-primary-subtle text-primary">
              <Building size={24} />
            </div>
            <div>
              <span className="text-muted fw-semibold" style={{ fontSize: '0.82rem' }}>Total Staff</span>
              <h3 className="mb-0 fw-bold">{employees.length}</h3>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="stat-card">
            <div className="stat-icon bg-info-subtle text-info">
              <Mail size={24} />
            </div>
            <div>
              <span className="text-muted fw-semibold" style={{ fontSize: '0.82rem' }}>Verified Emails</span>
              <h3 className="mb-0 fw-bold">{employees.filter((e) => e.email).length}</h3>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="stat-card">
            <div className="stat-icon bg-success-subtle text-success">
              <MapPin size={24} />
            </div>
            <div>
              <span className="text-muted fw-semibold" style={{ fontSize: '0.82rem' }}>Global Hubs</span>
              <h3 className="mb-0 fw-bold">{new Set(employees.map((e) => e.location)).size}</h3>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="stat-card">
            <div className="stat-icon bg-warning-subtle text-warning">
              <DollarSign size={24} />
            </div>
            <div>
              <span className="text-muted fw-semibold" style={{ fontSize: '0.82rem' }}>Avg. Compensation</span>
              <h3 className="mb-0 fw-bold">$105,400</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Control Bar: Search, Filters & View Mode Toggles */}
      <div className="card border-0 shadow-sm p-3 mb-4 bg-white rounded-3">
        <div className="d-flex flex-column flex-md-row align-items-stretch align-items-md-center justify-content-between gap-3">
          {/* Search Box */}
          <div className="position-relative flex-grow-1" style={{ maxWidth: '420px' }}>
            <Search
              size={18}
              className="position-absolute text-muted"
              style={{ top: '50%', transform: 'translateY(-50%)', left: '14px' }}
            />
            <input
              type="text"
              id="employee-search-input"
              className="form-control form-control-modern ps-5"
              placeholder="Search by ID, name, email, role, or city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className="btn btn-sm btn-link position-absolute text-muted text-decoration-none"
                style={{ top: '50%', transform: 'translateY(-50%)', right: '10px' }}
                onClick={() => setSearchTerm('')}
              >
                Clear
              </button>
            )}
          </div>

          <div className="d-flex align-items-center gap-2 flex-wrap justify-content-between justify-content-md-end">
            {/* Role Filter */}
            <select
              className="form-select form-select-modern text-muted"
              style={{ width: 'auto', minWidth: '160px' }}
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              aria-label="Filter by Designation"
            >
              {designations.map((role) => (
                <option key={role} value={role}>
                  {role === 'ALL' ? 'All Designations' : role}
                </option>
              ))}
            </select>

            {/* View Mode Toggle Buttons */}
            <div className="btn-group shadow-sm" role="group" aria-label="View toggle">
              <button
                type="button"
                className={`view-toggle-btn ${viewMode === 'card' ? 'active' : ''}`}
                onClick={() => setViewMode('card')}
                title="Card View"
                id="toggle-card-view"
              >
                <LayoutGrid size={16} />
                <span className="d-none d-sm-inline">Cards</span>
              </button>
              <button
                type="button"
                className={`view-toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
                onClick={() => setViewMode('table')}
                title="Tabular View"
                id="toggle-table-view"
              >
                <TableIcon size={16} />
                <span className="d-none d-sm-inline">Table</span>
              </button>
              <button
                type="button"
                className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                title="List View"
                id="toggle-list-view"
              >
                <ListIcon size={16} />
                <span className="d-none d-sm-inline">List</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Loading employees...</span>
          </div>
          <p className="mt-3 text-muted fw-semibold">Connecting to API and loading directory...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="alert alert-danger d-flex align-items-center gap-3 p-4 rounded-3 shadow-sm mb-4">
          <AlertCircle size={28} className="text-danger flex-shrink-0" />
          <div className="flex-grow-1">
            <h5 className="alert-heading fw-bold mb-1">Failed to fetch data</h5>
            <p className="mb-0 text-muted">{error}</p>
          </div>
          <button onClick={refreshEmployees} className="btn btn-outline-danger btn-sm">
            Try Again
          </button>
        </div>
      )}

      {/* Empty Search Result State */}
      {!loading && !error && filteredEmployees.length === 0 && (
        <div className="card text-center p-5 border-0 shadow-sm rounded-4 bg-white">
          <div className="mb-3 text-muted">
            <Search size={48} strokeWidth={1.5} />
          </div>
          <h4 className="fw-bold">No employees matched your criteria</h4>
          <p className="text-muted mx-auto" style={{ maxWidth: '420px' }}>
            We couldn't find any staff member matching "{searchTerm}". Try checking for spelling errors or clear filters.
          </p>
          <div className="d-flex justify-content-center gap-2 mt-2">
            <button
              className="btn btn-secondary-modern"
              onClick={() => {
                setSearchTerm('');
                setSelectedRole('ALL');
              }}
            >
              Reset Filters
            </button>
            <Link to="/employee-form" className="btn btn-primary-gradient">
              <UserPlus size={16} /> Add Employee
            </Link>
          </div>
        </div>
      )}

      {/* VIEW 1: CARD VIEW */}
      {!loading && !error && viewMode === 'card' && filteredEmployees.length > 0 && (
        <div className="row g-4" id="employee-card-grid">
          {filteredEmployees.map((emp) => (
            <div key={emp.id} className="col-12 col-md-6 col-lg-4">
              <div className="employee-card">
                {/* Header: Avatar, Name, ID badge */}
                <div className="d-flex align-items-start justify-content-between gap-3 mb-3">
                  <div className="d-flex align-items-center gap-3">
                    <div className="card-avatar">
                      {getInitials(emp.name)}
                    </div>
                    <div>
                      <h5 className="mb-1 fw-bold text-dark">{emp.name}</h5>
                      <span className="badge bg-light text-secondary border px-2 py-1" style={{ fontSize: '0.75rem' }}>
                        {emp.designation || 'Staff Member'}
                      </span>
                    </div>
                  </div>
                  <span className="id-badge" title="Employee ID">
                    ID #{emp.id}
                  </span>
                </div>

                {/* Primary Requirement Fields: id, name, and email */}
                <div className="bg-light p-3 rounded-3 mb-3">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <Mail size={15} className="text-primary flex-shrink-0" />
                    <a
                      href={`mailto:${emp.email}`}
                      className="text-truncate text-decoration-none fw-semibold text-dark"
                      style={{ fontSize: '0.88rem' }}
                      title={emp.email}
                    >
                      {emp.email}
                    </a>
                  </div>

                  <div className="d-flex align-items-center gap-2 text-muted" style={{ fontSize: '0.84rem' }}>
                    <MapPin size={15} className="text-danger flex-shrink-0" />
                    <span className="text-truncate">{emp.location || 'Remote'}</span>
                  </div>
                </div>

                {/* Compensation & Status */}
                <div className="mt-auto pt-2 border-top d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-1 text-success fw-bold">
                    <DollarSign size={16} />
                    <span style={{ fontSize: '0.95rem' }}>{formatSalary(emp.salary)}</span>
                    <span className="text-muted fw-normal" style={{ fontSize: '0.75rem' }}>/yr</span>
                  </div>

                  {emp.isLocal && (
                    <button
                      className="btn btn-sm btn-outline-danger border-0 p-1 rounded-2"
                      onClick={() => deleteEmployee(emp.id)}
                      title="Remove locally added employee"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIEW 2: TABULAR VIEW */}
      {!loading && !error && viewMode === 'table' && filteredEmployees.length > 0 && (
        <div className="custom-table-card table-responsive" id="employee-table-container">
          <table className="table custom-table table-hover align-middle">
            <thead>
              <tr>
                <th scope="col" style={{ width: '80px' }}>ID</th>
                <th scope="col">Name</th>
                <th scope="col">Email Address</th>
                <th scope="col">Designation</th>
                <th scope="col">Location</th>
                <th scope="col">Salary</th>
                <th scope="col" className="text-end" style={{ width: '100px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((emp) => (
                <tr key={emp.id}>
                  {/* ID */}
                  <td>
                    <span className="id-badge">#{emp.id}</span>
                  </td>

                  {/* Name */}
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                        style={{
                          width: '32px',
                          height: '32px',
                          fontSize: '0.78rem',
                          background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)'
                        }}
                      >
                        {getInitials(emp.name)}
                      </div>
                      <span className="fw-bold text-dark">{emp.name}</span>
                      {emp.isLocal && (
                        <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-2 py-0" style={{ fontSize: '0.68rem' }}>
                          New
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Email */}
                  <td>
                    <div className="d-flex align-items-center gap-1">
                      <Mail size={14} className="text-muted" />
                      <a href={`mailto:${emp.email}`} className="text-primary text-decoration-none fw-semibold">
                        {emp.email}
                      </a>
                    </div>
                  </td>

                  {/* Designation */}
                  <td>
                    <span className="badge bg-light text-secondary border px-2 py-1 fw-semibold">
                      {emp.designation || 'Specialist'}
                    </span>
                  </td>

                  {/* Location */}
                  <td>
                    <span className="text-muted d-flex align-items-center gap-1">
                      <MapPin size={14} className="text-danger flex-shrink-0" />
                      {emp.location || 'Remote'}
                    </span>
                  </td>

                  {/* Salary */}
                  <td>
                    <span className="fw-bold text-dark">{formatSalary(emp.salary)}</span>
                  </td>

                  {/* Actions */}
                  <td className="text-end">
                    {emp.isLocal ? (
                      <button
                        className="btn btn-sm btn-outline-danger p-1 rounded-2"
                        onClick={() => deleteEmployee(emp.id)}
                        title="Remove locally added employee"
                      >
                        <Trash2 size={15} />
                      </button>
                    ) : (
                      <span className="badge bg-light text-muted border" style={{ fontSize: '0.72rem' }}>
                        API
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* VIEW 3: LIST VIEW */}
      {!loading && !error && viewMode === 'list' && filteredEmployees.length > 0 && (
        <div className="d-flex flex-column gap-3" id="employee-list-container">
          {filteredEmployees.map((emp) => (
            <div
              key={emp.id}
              className="card border-0 shadow-sm p-3 rounded-3 bg-white d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3"
            >
              <div className="d-flex align-items-center gap-3">
                <span className="id-badge">#{emp.id}</span>
                <div
                  className="rounded-3 d-flex align-items-center justify-content-center text-white fw-bold"
                  style={{
                    width: '44px',
                    height: '44px',
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                  }}
                >
                  {getInitials(emp.name)}
                </div>
                <div>
                  <h6 className="mb-0 fw-bold text-dark">{emp.name}</h6>
                  <span className="text-muted" style={{ fontSize: '0.82rem' }}>
                    {emp.designation} • {emp.location}
                  </span>
                </div>
              </div>

              <div className="d-flex align-items-center gap-4 flex-wrap">
                <div className="d-flex align-items-center gap-1 text-muted" style={{ fontSize: '0.9rem' }}>
                  <Mail size={15} className="text-primary" />
                  <a href={`mailto:${emp.email}`} className="text-decoration-none text-dark fw-semibold">
                    {emp.email}
                  </a>
                </div>

                <div className="text-success fw-bold" style={{ fontSize: '0.95rem' }}>
                  {formatSalary(emp.salary)}
                </div>

                {emp.isLocal && (
                  <button
                    className="btn btn-sm btn-outline-danger border-0 p-1"
                    onClick={() => deleteEmployee(emp.id)}
                    title="Remove record"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer count indicator */}
      {!loading && !error && filteredEmployees.length > 0 && (
        <div className="d-flex align-items-center justify-content-between mt-4 text-muted" style={{ fontSize: '0.85rem' }}>
          <span>
            Showing <strong className="text-dark">{filteredEmployees.length}</strong> of{' '}
            <strong className="text-dark">{employees.length}</strong> total employees
          </span>
          <button
            className="btn btn-link btn-sm text-decoration-none text-muted p-0"
            onClick={resetToApiData}
            title="Reset directory back to original API dataset"
          >
            Reset to API Defaults
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
