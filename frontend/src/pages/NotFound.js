import React from 'react';
const NotFound = () => (
  <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f3f4f6' }}>
    <div className="card" style={{ textAlign: 'center' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: 12 }}>404</h1>
      <div style={{ fontSize: '1.25rem', marginBottom: 24 }}>Page Not Found</div>
      <a href="/" className="btn">Go Home</a>
    </div>
  </div>
);
export default NotFound;
