import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  User,
  Briefcase,
  MapPin,
  DollarSign,
  Mail,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  AlertCircle,
  Eye,
  RotateCcw
} from 'lucide-react';
import { useEmployees } from '../context/EmployeeContext';

const EmployeeForm = () => {
  const navigate = useNavigate();
  const { addEmployee } = useEmployees();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    location: '',
    salary: '',
    email: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successInfo, setSuccessInfo] = useState(null);

  // Common designation presets for quick-pick
  const popularDesignations = [
    'Software Engineer',
    'Senior Frontend Developer',
    'Backend Engineer',
    'Product Designer',
    'DevOps Engineer',
    'HR Generalist',
    'Project Manager'
  ];

  // Validation
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Employee name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.designation.trim()) {
      newErrors.designation = 'Designation/Job title is required';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location or city is required';
    }

    if (!formData.salary) {
      newErrors.salary = 'Salary is required';
    } else {
      const numericSalary = Number(String(formData.salary).replace(/[^0-9.-]+/g, ''));
      if (isNaN(numericSalary) || numericSalary <= 0) {
        newErrors.salary = 'Please enter a valid positive salary amount';
      }
    }

    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleQuickRole = (role) => {
    setFormData((prev) => ({
      ...prev,
      designation: role
    }));
    if (errors.designation) {
      setErrors((prev) => ({ ...prev, designation: null }));
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      designation: '',
      location: '',
      salary: '',
      email: ''
    });
    setErrors({});
    setSuccessInfo(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const added = addEmployee(formData);
      setIsSubmitting(false);
      setSuccessInfo(added);
    }, 400);
  };

  // Avatar initials helper
  const getInitials = (name) => {
    if (!name.trim()) return '?';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.trim().slice(0, 2).toUpperCase();
  };

  const formatSalaryPreview = (val) => {
    if (!val) return '$0 / year';
    const num = Number(String(val).replace(/[^0-9.-]+/g, ''));
    if (isNaN(num)) return `$${val}`;
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num);
  };

  return (
    <div className="container animate-fade-in">
      {/* Navigation Breadcrumb / Top Bar */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <Link to="/" className="btn btn-secondary-modern btn-sm text-decoration-none">
          <ArrowLeft size={16} />
          <span>Back to Dashboard</span>
        </Link>
        <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-3 py-1 rounded-pill">
          Employee Registration
        </span>
      </div>

      <div className="row g-4 justify-content-center">
        {/* Main Form Column */}
        <div className="col-12 col-lg-7">
          <div className="form-card">
            {/* Form Title & Description */}
            <div className="mb-4">
              <div className="d-flex align-items-center gap-2 mb-2">
                <div
                  className="rounded-3 d-flex align-items-center justify-content-center text-white p-2"
                  style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' }}
                >
                  <Briefcase size={20} />
                </div>
                <h3 className="mb-0 fw-bold">Employee Registration Form</h3>
              </div>
              <p className="text-muted mb-0" style={{ fontSize: '0.92rem' }}>
                Fill out the employee profile details below to add a new team member directly to the system directory.
              </p>
            </div>

            {/* Success Alert Banner */}
            {successInfo && (
              <div className="alert alert-success d-flex align-items-start gap-3 p-3 rounded-3 shadow-sm mb-4 animate-fade-in">
                <CheckCircle2 size={24} className="text-success flex-shrink-0 mt-1" />
                <div className="flex-grow-1">
                  <h6 className="alert-heading fw-bold mb-1">Employee Successfully Registered!</h6>
                  <p className="mb-2 text-muted" style={{ fontSize: '0.88rem' }}>
                    <strong>{successInfo.name}</strong> has been enrolled as{' '}
                    <strong>{successInfo.designation}</strong> with ID <strong>#{successInfo.id}</strong>.
                  </p>
                  <div className="d-flex gap-2">
                    <button
                      onClick={() => navigate('/')}
                      className="btn btn-success btn-sm fw-semibold"
                      id="view-in-dashboard-btn"
                    >
                      View in Dashboard
                    </button>
                    <button onClick={handleReset} className="btn btn-outline-success btn-sm">
                      Add Another
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate id="employee-registration-form">
              {/* Field 1: Name */}
              <div className="mb-3">
                <label htmlFor="name-input" className="form-label-modern">
                  <User size={16} className="text-primary" />
                  <span>Employee Name <span className="text-danger">*</span></span>
                </label>
                <input
                  type="text"
                  id="name-input"
                  name="name"
                  className={`form-control form-control-modern ${errors.name ? 'is-invalid border-danger' : ''}`}
                  placeholder="e.g. Alexandra Chen"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                {errors.name ? (
                  <div className="text-danger mt-1 d-flex align-items-center gap-1" style={{ fontSize: '0.82rem' }}>
                    <AlertCircle size={14} /> {errors.name}
                  </div>
                ) : (
                  <small className="text-muted" style={{ fontSize: '0.8rem' }}>
                    Full legal or preferred name of the employee
                  </small>
                )}
              </div>

              {/* Field 2: Designation */}
              <div className="mb-3">
                <label htmlFor="designation-input" className="form-label-modern">
                  <Briefcase size={16} className="text-primary" />
                  <span>Designation / Role <span className="text-danger">*</span></span>
                </label>
                <input
                  type="text"
                  id="designation-input"
                  name="designation"
                  className={`form-control form-control-modern ${errors.designation ? 'is-invalid border-danger' : ''}`}
                  placeholder="e.g. Lead Frontend Architect"
                  value={formData.designation}
                  onChange={handleChange}
                  required
                />
                {errors.designation ? (
                  <div className="text-danger mt-1 d-flex align-items-center gap-1" style={{ fontSize: '0.82rem' }}>
                    <AlertCircle size={14} /> {errors.designation}
                  </div>
                ) : (
                  <div className="mt-2 d-flex flex-wrap gap-1 align-items-center">
                    <span className="text-muted me-1" style={{ fontSize: '0.75rem' }}>Quick select:</span>
                    {popularDesignations.slice(0, 4).map((role) => (
                      <button
                        type="button"
                        key={role}
                        className="btn btn-sm btn-light border py-0 px-2 rounded-pill"
                        style={{ fontSize: '0.75rem' }}
                        onClick={() => handleQuickRole(role)}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Field 3: Location */}
              <div className="mb-3">
                <label htmlFor="location-input" className="form-label-modern">
                  <MapPin size={16} className="text-primary" />
                  <span>Location / City <span className="text-danger">*</span></span>
                </label>
                <input
                  type="text"
                  id="location-input"
                  name="location"
                  className={`form-control form-control-modern ${errors.location ? 'is-invalid border-danger' : ''}`}
                  placeholder="e.g. San Francisco, CA or London, UK"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
                {errors.location ? (
                  <div className="text-danger mt-1 d-flex align-items-center gap-1" style={{ fontSize: '0.82rem' }}>
                    <AlertCircle size={14} /> {errors.location}
                  </div>
                ) : (
                  <small className="text-muted" style={{ fontSize: '0.8rem' }}>
                    Base office or remote location
                  </small>
                )}
              </div>

              {/* Field 4: Salary */}
              <div className="mb-3">
                <label htmlFor="salary-input" className="form-label-modern">
                  <DollarSign size={16} className="text-primary" />
                  <span>Salary (Annual USD) <span className="text-danger">*</span></span>
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light text-muted fw-bold">$</span>
                  <input
                    type="number"
                    id="salary-input"
                    name="salary"
                    min="1"
                    step="500"
                    className={`form-control form-control-modern ${errors.salary ? 'is-invalid border-danger' : ''}`}
                    placeholder="e.g. 95000"
                    value={formData.salary}
                    onChange={handleChange}
                    required
                  />
                </div>
                {errors.salary ? (
                  <div className="text-danger mt-1 d-flex align-items-center gap-1" style={{ fontSize: '0.82rem' }}>
                    <AlertCircle size={14} /> {errors.salary}
                  </div>
                ) : (
                  <small className="text-muted" style={{ fontSize: '0.8rem' }}>
                    Numeric gross annual compensation amount
                  </small>
                )}
              </div>

              {/* Optional Field: Email */}
              <div className="mb-4">
                <label htmlFor="email-input" className="form-label-modern">
                  <Mail size={16} className="text-primary" />
                  <span>Email Address <span className="text-muted fw-normal">(Optional)</span></span>
                </label>
                <input
                  type="email"
                  id="email-input"
                  name="email"
                  className={`form-control form-control-modern ${errors.email ? 'is-invalid border-danger' : ''}`}
                  placeholder={
                    formData.name
                      ? `${formData.name.toLowerCase().replace(/[^a-z0-9]/g, '.')}@workpulse.io`
                      : 'employee@workpulse.io'
                  }
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email ? (
                  <div className="text-danger mt-1 d-flex align-items-center gap-1" style={{ fontSize: '0.82rem' }}>
                    <AlertCircle size={14} /> {errors.email}
                  </div>
                ) : (
                  <small className="text-muted" style={{ fontSize: '0.8rem' }}>
                    Auto-generated from employee name if left blank
                  </small>
                )}
              </div>

              {/* Form Actions */}
              <div className="d-flex align-items-center justify-content-between pt-3 border-top gap-3 flex-wrap">
                <button
                  type="button"
                  onClick={handleReset}
                  className="btn btn-secondary-modern"
                  id="reset-form-btn"
                >
                  <RotateCcw size={16} />
                  <span>Reset</span>
                </button>

                <div className="d-flex align-items-center gap-2">
                  <Link to="/" className="btn btn-link text-decoration-none text-muted">
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    className="btn btn-primary-gradient px-4"
                    disabled={isSubmitting}
                    id="submit-employee-btn"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Registering...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 size={18} />
                        <span>Save & Add Employee</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Live Preview Column */}
        <div className="col-12 col-lg-5">
          <div className="preview-card-wrapper">
            <div className="d-flex align-items-center gap-2 mb-3 text-muted">
              <Eye size={18} className="text-primary" />
              <span className="fw-bold" style={{ fontSize: '0.9rem' }}>
                Live Directory Preview
              </span>
              <span className="badge bg-light text-muted border ms-auto" style={{ fontSize: '0.72rem' }}>
                Instant Preview
              </span>
            </div>

            {/* Live Employee Card */}
            <div className="employee-card shadow-md">
              <div className="d-flex align-items-start justify-content-between gap-3 mb-3">
                <div className="d-flex align-items-center gap-3">
                  <div className="card-avatar">
                    {getInitials(formData.name)}
                  </div>
                  <div>
                    <h5 className="mb-1 fw-bold text-dark">
                      {formData.name.trim() || 'Employee Name'}
                    </h5>
                    <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-2 py-1" style={{ fontSize: '0.75rem' }}>
                      {formData.designation.trim() || 'Designation / Role'}
                    </span>
                  </div>
                </div>
                <span className="id-badge">ID #NEW</span>
              </div>

              <div className="bg-light p-3 rounded-3 mb-3">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <Mail size={15} className="text-primary flex-shrink-0" />
                  <span className="text-truncate fw-semibold text-dark" style={{ fontSize: '0.88rem' }}>
                    {formData.email.trim() ||
                      (formData.name.trim()
                        ? `${formData.name.toLowerCase().replace(/[^a-z0-9]/g, '.')}@workpulse.io`
                        : 'email@workpulse.io')}
                  </span>
                </div>

                <div className="d-flex align-items-center gap-2 text-muted" style={{ fontSize: '0.84rem' }}>
                  <MapPin size={15} className="text-danger flex-shrink-0" />
                  <span className="text-truncate">
                    {formData.location.trim() || 'Location / City'}
                  </span>
                </div>
              </div>

              <div className="mt-auto pt-2 border-top d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-1 text-success fw-bold">
                  <DollarSign size={16} />
                  <span>{formatSalaryPreview(formData.salary)}</span>
                </div>
                <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-2 py-1" style={{ fontSize: '0.7rem' }}>
                  Ready to enroll
                </span>
              </div>
            </div>

            {/* Tips Box */}
            <div className="card border-0 bg-white shadow-sm p-3 rounded-3 mt-3">
              <div className="d-flex align-items-center gap-2 text-primary fw-bold mb-1" style={{ fontSize: '0.85rem' }}>
                <Sparkles size={16} />
                <span>Automatic Directory Synchronization</span>
              </div>
              <p className="text-muted mb-0" style={{ fontSize: '0.82rem' }}>
                Once you click "Save & Add Employee", this record will immediately appear in the Tabular, Card, and List views on the Home Dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;
