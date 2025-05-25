import React, { useState } from 'react';
import './PageBackground.css';

const Signup = () => {
  const [role, setRole] = useState('volunteer');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!username || !email || !password || !confirm) {
      setError('All fields are required.');
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address.');
    } else if (password.length < 6) {
      setError('Password must be at least 6 characters.');
    } else if (password !== confirm) {
      setError('Passwords do not match.');
    } else {
      // Save user to localStorage
      const user = { username, email, password, role };
      let users = [];
      try {
        users = JSON.parse(localStorage.getItem('users')) || [];
      } catch {}
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('role', role);
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('currentUser', JSON.stringify(user));
      setSuccess('Account created! Redirecting...');
      setTimeout(() => { window.location.replace(`/${role}`); }, 1200);
    }
  };

  return (
    <div className="page-bg login-bg" style={{ minHeight: '100vh', background: 'url(/bg-home.jpg) center/cover fixed no-repeat' }}>
      <div className="overlay" style={{ background: 'rgba(255,255,255,0.65)', minHeight: '100vh' }}>
        <form className="card" style={{ maxWidth: 700, margin: 'auto', padding: '2.5rem 2rem', borderRadius: 16, boxShadow: '0 4px 24px rgba(37,99,235,0.09)', display: 'flex', flexDirection: 'row', gap: 36, alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.98)' }} onSubmit={handleSubmit} aria-label="Signup Form">
          <div style={{ flex: 1, minWidth: 240 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
              <img src="/logo-htf.png" alt="Logo" style={{ width: 44, height: 44, marginRight: 10, borderRadius: 8, boxShadow: '0 1px 4px #2563eb22', background: '#fff', padding: 2 }} />
              <span style={{ fontWeight: 800, fontSize: 22, color: '#2563eb', letterSpacing: 1 }}>Human Tem Foundation</span>
            </div>
            <h2 style={{ marginBottom: '1.5rem', textAlign: 'center', color: '#2563eb', fontWeight: 800, letterSpacing: 1 }}>Sign Up</h2>
            <div className="input-group">
              <input id="username" type="text" required placeholder=" " value={username} onChange={e => setUsername(e.target.value)} aria-label="Username" autoComplete="username" />
              <label htmlFor="username">Full Name</label>
            </div>
            <div className="input-group">
              <input id="email" type="email" required placeholder=" " value={email} onChange={e => setEmail(e.target.value)} aria-label="Email" autoComplete="email" />
              <label htmlFor="email">Email</label>
            </div>
            <div className="input-group" style={{ position: 'relative' }}>
              <input id="password" type={showPassword ? 'text' : 'password'} required placeholder=" " value={password} onChange={e => setPassword(e.target.value)} aria-label="Password" autoComplete="new-password" />
              <label htmlFor="password">Password</label>
              <span onClick={() => setShowPassword(v => !v)} style={{ position: 'absolute', right: 10, top: 14, cursor: 'pointer', color: '#888', fontSize: 18 }} title={showPassword ? 'Hide' : 'Show'}>{showPassword ? '🙈' : '👁️'}</span>
            </div>
            <div className="input-group">
              <input id="confirm" type={showPassword ? 'text' : 'password'} required placeholder=" " value={confirm} onChange={e => setConfirm(e.target.value)} aria-label="Confirm Password" autoComplete="new-password" />
              <label htmlFor="confirm">Confirm Password</label>
            </div>
            <div className="input-group">
              <select id="role" value={role} onChange={e => setRole(e.target.value)} aria-label="Role">
                <option value="volunteer">Volunteer</option>
                <option value="beneficiary">Beneficiary</option>
              </select>
              <label htmlFor="role">Role</label>
            </div>
            {error && <div className="status-danger" role="alert" style={{ marginBottom: 12 }}>{error}</div>}
            {success && <div className="status-success" role="alert" style={{ marginBottom: 12 }}>{success}</div>}
            <button className="btn" style={{ width: '100%', marginTop: '1rem', background: '#2563eb', color: '#fff', fontWeight: 700, borderRadius: 8, fontSize: '1.08rem', boxShadow: '0 2px 8px rgba(37,99,235,0.07)' }}>Sign Up</button>
            <div style={{ textAlign: 'center', marginTop: 18, color: '#555', fontSize: '1rem' }}>
              Already have an account? <a href="/login" style={{ color: '#2563eb', textDecoration: 'underline', fontWeight: 600 }}>Log In</a>
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 220, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ color: '#2563eb', fontWeight: 600, fontSize: '1.09rem', textAlign: 'center', marginTop: 8 }}>Join our mission and start making a difference!</div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
