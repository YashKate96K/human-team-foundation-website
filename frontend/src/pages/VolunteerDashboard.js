import React, { useState, useEffect } from 'react';
import './PageBackground.css';
import DashboardLayout from '../components/DashboardLayout';

const VolunteerDashboard = () => {
  const [myAssignments, setMyAssignments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    let user = null;
    try {
      user = JSON.parse(localStorage.getItem('currentUser'));
    } catch {}
    setCurrentUser(user);
    // Load notifications for this volunteer
    let allNotifications = [];
    try {
      allNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
    } catch {}
    if (user) {
      const myNotes = allNotifications.filter(n => n.to === user.username && n.type === 'assignment');
      setNotifications(myNotes);
      // Load assigned requests
      let requests = [];
      try {
        requests = JSON.parse(localStorage.getItem('requests')) || [];
      } catch {}
      setMyAssignments(requests.filter(r => r.volunteer === user.username));
    }
  }, []);

  const handleMarkDelivered = (id) => {
    setMyAssignments(assigns => assigns.map(d => d.id === id ? {
      ...d,
      status: 'delivered',
      date: new Date().toISOString().slice(0,10)
    } : d));
    // Update in localStorage
    let requests = [];
    try {
      requests = JSON.parse(localStorage.getItem('requests')) || [];
    } catch {}
    requests = requests.map(r => r.id === id ? { ...r, status: 'delivered', date: new Date().toISOString().slice(0,10) } : r);
    localStorage.setItem('requests', JSON.stringify(requests));
  };

  return (
    <div className="page-bg dashboard-bg">
      <div className="overlay">
        <DashboardLayout title="Volunteer Dashboard">
          <div style={{ maxWidth: 600, margin: '2rem auto', background: '#fff', padding: 24, borderRadius: 12, boxShadow: '0 2px 8px rgba(37,99,235,0.10)' }}>
            <h2 style={{ color: '#2563eb', marginBottom: 18 }}>Notifications</h2>
            {notifications.length === 0 ? <div>No new assignments.</div> : (
              <ul style={{ paddingLeft: 20 }}>
                {notifications.map((n, i) => (
                  <li key={i}>{n.message} (Request ID: {n.requestId})</li>
                ))}
              </ul>
            )}
          </div>
          <div className="card" style={{ margin: '2rem auto', maxWidth: 900, padding: '1.5rem', background: '#fff', borderRadius: 14, boxShadow: '0 2px 8px rgba(37,99,235,0.05)' }}>
            <h3 style={{ marginBottom: 18, color: '#2563eb', fontWeight: 700 }}>My Assigned Deliveries</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '1.08rem' }}>
              <thead>
                <tr style={{ background: '#f8fafc', color: '#2563eb' }}>
                  <th style={{ padding: '8px 12px', borderRadius: 6 }}>Delivery</th>
                  <th style={{ padding: '8px 12px', borderRadius: 6 }}>Status</th>
                  <th style={{ padding: '8px 12px', borderRadius: 6 }}>Delivered Date</th>
                  <th style={{ padding: '8px 12px', borderRadius: 6 }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {myAssignments.length === 0 ? (
                  <tr><td colSpan={4} style={{ textAlign: 'center', padding: 20 }}>No assignments yet.</td></tr>
                ) : myAssignments.map(deliv => (
                  <tr key={deliv.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '8px 12px' }}>{deliv.title}</td>
                    <td style={{ padding: '8px 12px' }}>{deliv.status}</td>
                    <td style={{ padding: '8px 12px' }}>{deliv.date || '-'}</td>
                    <td style={{ padding: '8px 12px' }}>
                      {deliv.status !== 'delivered' && (
                        <button onClick={() => handleMarkDelivered(deliv.id)} style={{ padding: '4px 10px', borderRadius: 6, border: 'none', background: '#22c55e', color: '#fff', fontWeight: 600, cursor: 'pointer' }}>Mark as Delivered</button>
                      )}
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

export default VolunteerDashboard;
