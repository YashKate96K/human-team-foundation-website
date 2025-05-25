import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';

const Donate = () => {
  const [form, setForm] = useState({ name: '', id: '', location: '', amount: '', qr: null });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'qr' && files && files[0]) {
      setForm(f => ({ ...f, qr: files[0] }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
    // Here you could add logic to save the donation info or send to backend
  };

  return (
    <DashboardLayout title="Donate">
      <div style={{ maxWidth: 480, margin: '2rem auto', background: '#fff', padding: 24, borderRadius: 12, boxShadow: '0 2px 8px rgba(37,99,235,0.10)' }}>
        <h2 style={{ color: '#2563eb', marginBottom: 18 }}>Donate to the Foundation</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Name</label>
            <input name="name" value={form.name} onChange={handleChange} required style={{ width: '100%' }} />
          </div>
          <div className="input-group">
            <label>ID</label>
            <input name="id" value={form.id} onChange={handleChange} required style={{ width: '100%' }} />
          </div>
          <div className="input-group">
            <label>Location</label>
            <input name="location" value={form.location} onChange={handleChange} required style={{ width: '100%' }} />
          </div>
          <div className="input-group">
            <label>Amount (optional)</label>
            <input name="amount" value={form.amount} onChange={handleChange} style={{ width: '100%' }} />
          </div>
          <div className="input-group">
            <label>QR Image (for payment)</label>
            <input name="qr" type="file" accept="image/*" onChange={handleChange} required />
            {form.qr && <img src={URL.createObjectURL(form.qr)} alt="QR Preview" style={{ marginTop: 12, width: 120, height: 120, objectFit: 'contain', border: '1px solid #eee', borderRadius: 8 }} />}
          </div>
          <button className="btn" style={{ marginTop: 16, background: '#2563eb', color: '#fff', fontWeight: 700, borderRadius: 8 }}>Donate</button>
        </form>
        {submitted && <div style={{ marginTop: 20, color: '#22c55e', fontWeight: 600 }}>Thank you for your donation!</div>}
      </div>
    </DashboardLayout>
  );
};

export default Donate;
