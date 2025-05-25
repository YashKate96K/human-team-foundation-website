import React, { useState, useEffect } from 'react';
import './PageBackground.css';
import DashboardLayout from '../components/DashboardLayout';

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

const BeneficiaryDashboard = () => {
  const [requests, setRequests] = useState(loadRequests());
  const [form, setForm] = useState({ title: '', count: 1, remark: '' });
  const [feedback, setFeedback] = useState({});

  // Sync with localStorage on mount
  useEffect(() => {
    setRequests(loadRequests());
  }, []);

  // Save to localStorage when requests change
  useEffect(() => {
    saveRequests(requests);
  }, [requests]);

  const handleSubmitRequest = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    const newReq = {
      id: Date.now(),
      title: form.title,
      count: form.count,
      remark: form.remark,
      status: 'pending',
      feedback: null,
      volunteer: null
    };
    setRequests(reqs => [...reqs, newReq]);
    setForm({ title: '', count: 1, remark: '' });
  };

  const handleFeedback = (id, stars, comment) => {
    setRequests(reqs => reqs.map(r => r.id === id ? { ...r, feedback: { stars, comment } } : r));
  };

  const info = [
    { label: 'Aid Received', value: '₹12,500', icon: '/icons/aid.svg', color: 'status-success' },
    { label: 'Upcoming Disbursement', value: '₹2,000', icon: '/icons/disbursement.svg', color: 'status-warning' },
    { label: 'Support Tickets', value: 1, icon: '/icons/support.svg', color: 'status-danger' },
  ];

  return (
    <div className="page-bg dashboard-bg">
      <div className="overlay">
        <DashboardLayout title="Beneficiary Dashboard">
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 32 }}>
            {info.map((i, idx) => (
              <div className="card dashboard-card" key={idx} style={{ minWidth: 180, flex: '1 1 180px', display: 'flex', alignItems: 'center', gap: 16, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(37,99,235,0.08)' }}>
                <img src={i.icon} alt="" width={36} height={36} aria-hidden style={{ filter: 'drop-shadow(0 2px 4px #2563eb22)' }} />
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: '#2563eb' }} className={i.color}>{i.value}</div>
                  <div style={{ color: '#555', fontSize: '1.07rem', fontWeight: 500 }}>{i.label}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="card" style={{ margin: '2rem auto', maxWidth: 480, padding: '1.5rem', background: '#f8fafc', borderRadius: 14, boxShadow: '0 2px 8px rgba(37,99,235,0.05)' }}>
            <h3 style={{ marginBottom: 12, color: '#2563eb', fontWeight: 700 }}>Recent Activity</h3>
            <ul style={{ listStyle: 'none', padding: 0, color: '#444', fontSize: '1.08rem' }}>
              <li>Aid received - Apr 20</li>
              <li>Support ticket opened - Apr 21</li>
            </ul>
          </div>
          {/* Submit Request Form */}
          <div className="card" style={{ margin: '2rem auto', maxWidth: 480, padding: '1.5rem', background: '#fff', borderRadius: 14, boxShadow: '0 2px 8px rgba(37,99,235,0.05)' }}>
            <h3 style={{ marginBottom: 18, color: '#2563eb', fontWeight: 700 }}>Submit New Request</h3>
            <form onSubmit={handleSubmitRequest} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="input-group" style={{ position: 'relative' }}>
                <input type="text" required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder=" " style={{ padding: '10px 8px', borderRadius: 6, border: '1px solid #ccc', width: '100%' }} />
                <label style={{ position: 'absolute', left: 10, top: form.title ? -10 : 12, fontSize: form.title ? 12 : 16, color: '#2563eb', background: '#fff', padding: '0 4px', transition: 'top 0.2s, font-size 0.2s' }}>Request Title</label>
              </div>
              <div className="input-group" style={{ position: 'relative' }}>
                <input type="number" min="1" value={form.count} onChange={e => setForm(f => ({ ...f, count: e.target.value }))} placeholder=" " style={{ padding: '10px 8px', borderRadius: 6, border: '1px solid #ccc', width: '100%' }} />
                <label style={{ position: 'absolute', left: 10, top: form.count ? -10 : 12, fontSize: form.count ? 12 : 16, color: '#2563eb', background: '#fff', padding: '0 4px', transition: 'top 0.2s, font-size 0.2s' }}>Count</label>
              </div>
              <div className="input-group" style={{ position: 'relative' }}>
                <input type="text" value={form.remark} onChange={e => setForm(f => ({ ...f, remark: e.target.value }))} placeholder=" " style={{ padding: '10px 8px', borderRadius: 6, border: '1px solid #ccc', width: '100%' }} />
                <label style={{ position: 'absolute', left: 10, top: form.remark ? -10 : 12, fontSize: form.remark ? 12 : 16, color: '#2563eb', background: '#fff', padding: '0 4px', transition: 'top 0.2s, font-size 0.2s' }}>Remark</label>
              </div>
              <button className="btn" style={{ background: '#2563eb', color: '#fff', fontWeight: 700, borderRadius: 6 }}>Submit Request</button>
            </form>
          </div>

          {/* Requests Table */}
          <div className="card" style={{ margin: '2rem auto', maxWidth: 900, padding: '1.5rem', background: '#fff', borderRadius: 14, boxShadow: '0 2px 8px rgba(37,99,235,0.05)' }}>
            <h3 style={{ marginBottom: 18, color: '#2563eb', fontWeight: 700 }}>My Requests</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '1.08rem' }}>
              <thead>
                <tr style={{ background: '#f8fafc', color: '#2563eb' }}>
                  <th style={{ padding: '8px 12px', borderRadius: 6 }}>Request</th>
                  <th style={{ padding: '8px 12px', borderRadius: 6 }}>Count</th>
                  <th style={{ padding: '8px 12px', borderRadius: 6 }}>Remark</th>
                  <th style={{ padding: '8px 12px', borderRadius: 6 }}>Status</th>
                  <th style={{ padding: '8px 12px', borderRadius: 6 }}>Feedback</th>
                </tr>
              </thead>
              <tbody>
                {requests.map(req => (
                  <tr key={req.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '8px 12px' }}>{req.title}</td>
                    <td style={{ padding: '8px 12px' }}>{req.count}</td>
                    <td style={{ padding: '8px 12px' }}>{req.remark}</td>
                    <td style={{ padding: '8px 12px', color: req.status === 'delivered' ? '#22c55e' : req.status === 'approved' ? '#2563eb' : '#fbbf24', fontWeight: 600 }}>{req.status.charAt(0).toUpperCase() + req.status.slice(1)}</td>
                    <td style={{ padding: '8px 12px' }}>
                      {req.status === 'delivered' ? (
                        req.feedback ? (
                          <div>
                            <span style={{ color: '#fbbf24', fontWeight: 700 }}>{'★'.repeat(req.feedback.stars)}{'☆'.repeat(5 - req.feedback.stars)}</span>
                            <span style={{ marginLeft: 8 }}>{req.feedback.comment}</span>
                          </div>
                        ) : (
                          <FeedbackForm onSubmit={(stars, comment) => handleFeedback(req.id, stars, comment)} />
                        )
                      ) : '—'}
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

function FeedbackForm({ onSubmit }) {
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState('');
  return (
    <form onSubmit={e => { e.preventDefault(); onSubmit(stars, comment); }} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {[1,2,3,4,5].map(s => (
        <span key={s} style={{ cursor: 'pointer', color: s <= stars ? '#fbbf24' : '#ddd', fontSize: 22 }} onClick={() => setStars(s)}>★</span>
      ))}
      <input type="text" value={comment} onChange={e => setComment(e.target.value)} placeholder="Comment" style={{ padding: '4px 8px', borderRadius: 6, border: '1px solid #ccc', marginLeft: 8 }} />
      <button type="submit" style={{ padding: '4px 10px', borderRadius: 6, border: 'none', background: '#2563eb', color: '#fff', fontWeight: 600, cursor: 'pointer' }}>Submit</button>
    </form>
  );
}

export default BeneficiaryDashboard;
