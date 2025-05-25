import React, { useState, useEffect } from 'react';
import './PageBackground.css';

const Login = () => {
  const [role, setRole] = useState('admin');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Ensure a default beneficiary user exists for demo/testing
  useEffect(() => {
    let users = [];
    try {
      users = JSON.parse(localStorage.getItem('users')) || [];
    } catch {}
    const hasBeneficiary = users.some(u => u.role === 'beneficiary');
    if (!hasBeneficiary) {
      const demoUser = { username: 'beneficiary', email: 'beneficiary@example.com', password: 'password', role: 'beneficiary' };
      users.push(demoUser);
      localStorage.setItem('users', JSON.stringify(users));
    }
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    // Authenticate user from localStorage
    let users = [];
    try {
      users = JSON.parse(localStorage.getItem('users')) || [];
    } catch {}
    const found = users.find(u => u.username === username && u.password === password && u.role === role);
    if (found) {
      localStorage.setItem('role', role);
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('currentUser', JSON.stringify(found));
      window.location.replace(`/${role}`);
    } else {
      // Check if there are users for this role
      const usersForRole = users.filter(u => u.role === role);
      if (usersForRole.length === 0) {
        setError(`No users found for role '${role}'. Please sign up first.`);
      } else {
        setError('Invalid credentials or user not found.');
      }
    }
  };

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (localStorage.getItem('loggedIn') === 'true') {
      const r = localStorage.getItem('role') || 'admin';
      window.location.replace(`/${r}`);
    }
  }, []);

  return (
    <div className="page-bg login-bg">
      <div className="overlay">
        <form className="card" style={{ maxWidth: 400, margin: 'auto' }} onSubmit={handleSubmit} aria-label="Login Form">
          <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Login</h2>
          <div className="input-group">
            <input id="username" type="text" required placeholder=" " value={username} onChange={e => setUsername(e.target.value)} aria-label="Username" />
            <label htmlFor="username">Username</label>
          </div>
          <div className="input-group" style={{ position: 'relative' }}>
            <input id="password" type={showPassword ? 'text' : 'password'} required placeholder=" " value={password} onChange={e => setPassword(e.target.value)} aria-label="Password" />
            <label htmlFor="password">Password</label>
            <span onClick={() => setShowPassword(v => !v)} style={{ position: 'absolute', right: 10, top: 14, cursor: 'pointer', color: '#888', fontSize: 18 }} title={showPassword ? 'Hide' : 'Show'}>{showPassword ? '🙈' : '👁️'}</span>
          </div>
          <div className="input-group">
            <select id="role" value={role} onChange={e => setRole(e.target.value)} aria-label="Role">
              <option value="admin">Admin</option>
              <option value="volunteer">Volunteer</option>
              <option value="beneficiary">Beneficiary</option>
            </select>
            <label htmlFor="role">Role</label>
          </div>
          {error && <div className="status-danger" role="alert">{error}</div>}
          <button className="btn" style={{ width: '100%', marginTop: '1rem' }}>Login</button>
          <div style={{ marginTop: 10, fontSize: '0.98rem', color: '#555' }}>
            <b>Demo Beneficiary:</b> <br />Username: <b>beneficiary</b> <br />Password: <b>password</b>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
