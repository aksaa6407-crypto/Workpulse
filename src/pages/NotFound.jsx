import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="container text-center py-5">
      <div className="card border-0 shadow-sm p-5 mx-auto rounded-4 bg-white" style={{ maxWidth: '520px' }}>
        <div className="mb-3 text-warning">
          <AlertTriangle size={56} />
        </div>
        <h2 className="fw-bold mb-2">Page Not Found</h2>
        <p className="text-muted mb-4">
          The page or route you requested doesn't exist in the directory. Please navigate back to the Employee Dashboard.
        </p>
        <div>
          <Link to="/" className="btn btn-primary-gradient">
            <Home size={18} />
            <span>Return to Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
