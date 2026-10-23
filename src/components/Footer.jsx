import React from 'react';
import { Heart, Globe, Shield, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="custom-footer mt-auto">
      <div className="container">
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 text-center text-md-start">
          <div>
            <span className="fw-semibold text-dark">WorkPulse</span> • Modern React Employee Dashboard
            <span className="d-block d-md-inline ms-md-2 text-muted" style={{ fontSize: '0.8rem' }}>
              Data source: <a href="https://jsonplaceholder.typicode.com/users" target="_blank" rel="noreferrer" className="text-decoration-none text-primary">jsonplaceholder.typicode.com/users</a>
            </span>
          </div>
          <div className="d-flex align-items-center gap-3">
            <span className="badge bg-light text-muted border">React 19 + Bootstrap 5</span>
            <span className="text-muted" style={{ fontSize: '0.8rem' }}>Secure & Responsive</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
