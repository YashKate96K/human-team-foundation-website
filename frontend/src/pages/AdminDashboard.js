import React, { useState, useEffect } from 'react';
import './PageBackground.css';
import DashboardLayout from '../components/DashboardLayout';
import { Chart } from 'chart.js/auto';

const statusOptions = ['pending', 'approved', 'delivered'];

// Utility functions for localStorage
function loadRequests() {
  try {
    return JSON.parse(localStorage.getItem('requests')) || [];
  } catch {
    return [];
  }
}
function saveRequests(reqs) {
  localStorage.setItem('requests', JSON.stringify(reqs));
}
// Add function to get all volunteers from localStorage
function getVolunteers() {
  try {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.filter(u => u.role === 'volunteer');
  } catch {
    return [];
  }
}

const AdminDashboard = () => {
  const [requests, setRequests] = useState(loadRequests());
  const [volunteers, setVolunteers] = useState([]);

  // Sync with localStorage on mount
  useEffect(() => {
    setRequests(loadRequests());
    setVolunteers(getVolunteers());
  }, []);

  // Save to localStorage when requests change
  useEffect(() => {
    saveRequests(requests);
  }, [requests]);

  // Analytics
  const totalRequests = requests.length;
  const approved = requests.filter(r => r.status === 'approved').length;
  const pending = requests.filter(r => r.status === 'pending').length;
  const delivered = requests.filter(r => r.status === 'delivered').length;

  React.useEffect(() => {
    let chartInstance;
    const ctx = document.getElementById('adminChart');
    if (ctx) {
      chartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Approved', 'Pending', 'Delivered'],
          datasets: [{
            data: [approved, pending, delivered],
            backgroundColor: ['#2563eb', '#fbbf24', '#22c55e'],
          }]
        },
        options: { plugins: { legend: { labels: { color: '#222', font: {size: 16} } } } }
      });
    }
    return () => {
      if (chartInstance) chartInstance.destroy();
    };
  }, [approved, pending, delivered]);

  // Send message to volunteer when assigned
  const handleAssign = (id, username) => {
    setRequests(reqs => reqs.map(r => r.id === id ? { ...r, volunteer: username, notify: true } : r));
    // Store a notification for the volunteer in localStorage
    let notifications = [];
    try {
      notifications = JSON.parse(localStorage.getItem('notifications')) || [];
    } catch {}
    notifications.push({
      to: username,
      type: 'assignment',
      message: `You have been assigned a new task. Please check your dashboard.`,
      time: new Date().toISOString(),
      requestId: id
    });
    localStorage.setItem('notifications', JSON.stringify(notifications));
  };

  // Change status
  const handleStatusChange = (id, status) => {
    setRequests(reqs => reqs.map(r => r.id === id ? { ...r, status } : r));
  };

  return (
    <div className="page-bg dashboard-bg">
      <div className="overlay">
        <DashboardLayout title="Admin Dashboard">
          {/* Analytics cards */}
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 32 }}>
            <div className="card dashboard-card" style={{ minWidth: 180, flex: '1 1 180px', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(37,99,235,0.08)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#2563eb' }}>{totalRequests}</div>
              <div style={{ color: '#555', fontSize: '1.07rem', fontWeight: 500 }}>Total Requests</div>
            </div>
            <div className="card dashboard-card" style={{ minWidth: 180, flex: '1 1 180px', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(37,99,235,0.08)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#fbbf24' }}>{approved}</div>
              <div style={{ color: '#555', fontSize: '1.07rem', fontWeight: 500 }}>Approved</div>
            </div>
            <div className="card dashboard-card" style={{ minWidth: 180, flex: '1 1 180px', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(37,99,235,0.08)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#f59e42' }}>{pending}</div>
              <div style={{ color: '#555', fontSize: '1.07rem', fontWeight: 500 }}>Pending</div>
            </div>
            <div className="card dashboard-card" style={{ minWidth: 180, flex: '1 1 180px', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(37,99,235,0.08)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#22c55e' }}>{delivered}</div>
              <div style={{ color: '#555', fontSize: '1.07rem', fontWeight: 500 }}>Delivered</div>
            </div>
          </div>

          {/* Chart */}
          <div className="card" style={{ margin: '2rem auto', maxWidth: 420, padding: '1.5rem', background: '#f8fafc', borderRadius: 14, boxShadow: '0 2px 8px rgba(37,99,235,0.05)' }}>
            <h3 style={{ marginBottom: 18, color: '#2563eb', fontWeight: 700 }}>Overview</h3>
            <canvas id="adminChart" width="400" height="220" aria-label="Admin Data Chart" role="img"></canvas>
          </div>

          {/* Requests Table */}
          <div className="card" style={{ margin: '2rem auto', maxWidth: 900, padding: '1.5rem', background: '#fff', borderRadius: 14, boxShadow: '0 2px 8px rgba(37,99,235,0.05)' }}>
            <h3 style={{ marginBottom: 18, color: '#2563eb', fontWeight: 700 }}>Manage Requests</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '1.08rem' }}>
              <thead>
                <tr style={{ background: '#f8fafc', color: '#2563eb' }}>
                  <th style={{ padding: '8px 12px', borderRadius: 6 }}>Request</th>
                  <th style={{ padding: '8px 12px', borderRadius: 6 }}>Status</th>
                  <th style={{ padding: '8px 12px', borderRadius: 6 }}>Volunteer</th>
                  <th style={{ padding: '8px 12px', borderRadius: 6 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map(req => (
                  <tr key={req.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '8px 12px' }}>{req.title}</td>
                    <td style={{ padding: '8px 12px' }}>
                      <select value={req.status} onChange={e => handleStatusChange(req.id, e.target.value)} style={{ padding: '4px 8px', borderRadius: 6, border: '1px solid #ccc' }}>
                        {statusOptions.map(opt => <option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>)}
                      </select>
                    </td>
                    <td style={{ padding: '8px 12px' }}>
                      <select value={req.volunteer || ''} onChange={e => handleAssign(req.id, e.target.value)} style={{ padding: '4px 8px', borderRadius: 6, border: '1px solid #ccc' }}>
                        <option value="">Unassigned</option>
                        {volunteers.map(v => (
                          <option key={v.username} value={v.username}>{v.username}</option>
                        ))}
                      </select>
                    </td>
                    <td style={{ padding: '8px 12px' }}>
                      {statusOptions.map(opt => (
                        <button key={opt} onClick={() => handleStatusChange(req.id, opt)} style={{ marginRight: 6, padding: '4px 10px', borderRadius: 6, border: 'none', background: req.status === opt ? '#2563eb' : '#e5e7eb', color: req.status === opt ? '#fff' : '#222', fontWeight: 600, cursor: 'pointer' }}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</button>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DashboardLayout>
      </div>
    </div>
  );
};

export default AdminDashboard;
