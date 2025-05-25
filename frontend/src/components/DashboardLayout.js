import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardLayout = ({ title, children }) => {
  const navigate = useNavigate();
  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };
  return (
    <div className="page-bg dashboard-bg">
      <header style={{ padding: '1.1rem 2.2rem 1.1rem 2.2rem', display: 'flex', alignItems: 'center', gap: 14, background: 'rgba(255,255,255,0.83)', boxShadow: '0 2px 8px rgba(30,41,59,0.07)', position: 'sticky', top: 0, zIndex: 20 }}>
        <button
          aria-label="Go Back"
          onClick={handleBack}
          style={{ background: 'none', border: 'none', padding: 0, marginRight: 8, cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <img src="/logo-htf.png" alt="Logo" style={{ width: 44, height: 44, borderRadius: 8, boxShadow: '0 1px 4px #2563eb22', background: '#fff', padding: 2 }} />
        <span style={{ fontWeight: 800, fontSize: 22, color: '#2563eb', letterSpacing: 1 }}>Human Tem Foundation</span>
        <span style={{ flex: 1 }} />
        {title && <h1 style={{ margin: 0, fontSize: 22, color: '#2563eb', fontWeight: 700, letterSpacing: 0.5 }}>{title}</h1>}
      </header>
      <main style={{ padding: '2rem 1rem', background: 'rgba(255,255,255,0.81)', minHeight: 'calc(100vh - 80px)' }}>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
