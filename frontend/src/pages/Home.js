import React, { useState } from 'react';
import './PageBackground.css';

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [loginRole, setLoginRole] = useState('admin');
  const [loginError, setLoginError] = useState('');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    let users = [];
    try {
      users = JSON.parse(localStorage.getItem('users')) || [];
    } catch {}
    const found = users.find(u => u.username === loginUsername && u.password === loginPassword && u.role === loginRole);
    if (found) {
      localStorage.setItem('role', loginRole);
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('currentUser', JSON.stringify(found));
      window.location.replace(`/${loginRole}`);
    } else {
      // Check if there are users for this role
      const usersForRole = users.filter(u => u.role === loginRole);
      if (usersForRole.length === 0) {
        setLoginError(`No users found for role '${loginRole}'. Please sign up first.`);
      } else {
        setLoginError('Invalid credentials or user not found.');
      }
    }
  };

  return (
    <div className="page-bg home-bg" style={{ minHeight: '100vh', background: 'url(/bg-home.jpg) center/cover fixed no-repeat' }}>
      <header style={{ background: 'rgba(255,255,255,0.83)', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', padding: '0.5rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <img src="/logo-htf.png" alt="Logo" style={{ width: 44, height: 44, borderRadius: 8, boxShadow: '0 1px 4px #2563eb22', background: '#fff', padding: 2 }} />
          <span style={{ fontWeight: 800, fontSize: 22, color: '#2563eb', letterSpacing: 1 }}>Human Tem Foundation</span>
        </div>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 32, fontWeight: 600, fontSize: '1.08rem' }}>
          <a href="#about" style={{ color: '#222', textDecoration: 'none' }}>About Us</a>
          <a href="#work" style={{ color: '#222', textDecoration: 'none' }}>Our Work</a>
          <a href="#involved" style={{ color: '#222', textDecoration: 'none' }}>Get Involved</a>
          <a href="#blogs" style={{ color: '#222', textDecoration: 'none' }}>Blogs</a>
          <a href="#contact" style={{ color: '#222', textDecoration: 'none' }}>Contact Us</a>
          <a href="#donate" style={{ color: '#222', textDecoration: 'none' }}>Donate</a>
          <input type="text" placeholder="Search" style={{ padding: '0.35rem 0.8rem', borderRadius: 6, border: '1px solid #ddd', marginLeft: 10, fontSize: '1rem' }} />
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <a href="/" className="btn" style={{ background: '#2563eb', color: '#fff', fontWeight: 700, borderRadius: 8, fontSize: '1.09rem', padding: '0.7rem 1.6rem', textDecoration: 'none' }}>Home</a>
        </div>
      </header>
      <div style={{ height: 60 }} />
      <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '70vh', textAlign: 'left', position: 'relative' }}>
        <div style={{ maxWidth: 900, margin: '3rem auto', padding: '2.5rem 2rem', background: 'rgba(255,255,255,0.92)', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
          <div style={{ color: '#f59e42', fontWeight: 700, fontSize: '1.15rem', marginBottom: 10 }}>Empowering Humanity, Inspiring Change</div>
          <h1 style={{ color: '#222', fontWeight: 900, fontSize: '2.7rem', marginBottom: 24, lineHeight: 1.1 }}>
            Welcome to Human Tem Foundation<br />
            <span style={{ color: '#2563eb' }}>Together for a Better Tomorrow</span>
          </h1>
          <p style={{ color: '#444', fontSize: '1.25rem', marginBottom: 24, maxWidth: 700 }}>
            Human Tem Foundation is dedicated to uplifting lives through education, healthcare, and community empowerment. Join us in our mission to create lasting impact and foster a culture of trust, transparency, and teamwork.
          </p>
          <div style={{ display: 'flex', gap: 16, marginBottom: 28, flexWrap: 'wrap' }}>
            <button className="btn" style={{ background: '#2563eb', color: '#fff', borderRadius: 6, fontWeight: 700 }} onClick={() => {
              localStorage.setItem('role', 'admin');
              window.location.href = '/admin';
            }}>Admin Dashboard</button>
            <button className="btn" style={{ background: '#f59e42', color: '#fff', borderRadius: 6, fontWeight: 700 }} onClick={() => { setShowLogin(true); setLoginRole('volunteer'); }}>Volunteer Login</button>
            <button className="btn" style={{ background: '#7ed957', color: '#fff', borderRadius: 6, fontWeight: 700 }} onClick={() => { setShowLogin(true); setLoginRole('beneficiary'); }}>Beneficiary Login</button>
            <button className="btn" style={{ background: '#2563eb', color: '#fff', borderRadius: 6, fontWeight: 700, border: '1.5px solid #fff' }} onClick={() => window.location.href='/signup'}>Sign Up</button>
            <button className="btn" style={{ background: '#e11d48', color: '#fff', borderRadius: 6, fontWeight: 700, marginTop: 12 }} onClick={() => window.location.href = '/donate'}>Donate</button>
          </div>
          <ul style={{ display: 'flex', gap: 28, flexWrap: 'wrap', listStyle: 'none', padding: 0, margin: 0, color: '#2563eb', fontWeight: 600, fontSize: '1.1rem' }}>
            <li>Education for All</li>
            <li>Accessible Healthcare</li>
            <li>Women & Youth Empowerment</li>
            <li>Disaster Relief</li>
            <li>Environmental Care</li>
          </ul>
        </div>
        {showLogin && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(30,41,59,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200 }}>
            <div className="card" style={{ minWidth: 320, maxWidth: 380, padding: '2rem 1.5rem', position: 'relative' }}>
              <button aria-label="Close login" style={{ position: 'absolute', top: 14, right: 14, background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#888' }} onClick={() => setShowLogin(false)}>&times;</button>
              <h2 style={{ textAlign: 'center', marginBottom: 18 }}>{loginRole.charAt(0).toUpperCase() + loginRole.slice(1)} Login</h2>
              <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <input type="hidden" name="role" value={loginRole} />
                <div className="input-group">
                  <input id="username" type="text" required placeholder=" " aria-label="Username" value={loginUsername} onChange={e => setLoginUsername(e.target.value)} />
                  <label htmlFor="username">Username</label>
                </div>
                <div className="input-group" style={{ position: 'relative' }}>
                  <input id="password" type={showPassword ? 'text' : 'password'} required placeholder=" " aria-label="Password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} />
                  <label htmlFor="password">Password</label>
                  <span onClick={() => setShowPassword(v => !v)} style={{ position: 'absolute', right: 10, top: 14, cursor: 'pointer', color: '#888', fontSize: 18 }} title={showPassword ? 'Hide' : 'Show'}>{showPassword ? '🙈' : '👁️'}</span>
                </div>
                <button className="btn" style={{ background: loginRole === 'admin' ? '#2563eb' : loginRole === 'volunteer' ? '#f59e42' : '#7ed957', color: '#fff', fontWeight: 700 }}>{loginRole.charAt(0).toUpperCase() + loginRole.slice(1)} Login</button>
                {loginError && <div className="status-danger" style={{ textAlign: 'center' }}>{loginError}</div>}
                {loginRole !== 'admin' && (
                  <div style={{ textAlign: 'center', marginTop: 8 }}>
                    <span>Don't have an account? <a href="/signup" style={{ color: '#2563eb', textDecoration: 'underline', cursor: 'pointer' }}>Sign Up</a></span>
                  </div>
                )}
              </form>
            </div>
          </div>
        )}
        <section id="about" style={{ maxWidth: 900, margin: '2.5rem auto', padding: '2rem', background: 'rgba(255,255,255,0.96)', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <h2 style={{ color: '#2563eb', fontWeight: 800, fontSize: '2rem', marginBottom: 12 }}>About Us</h2>
          <p style={{ color: '#444', fontSize: '1.1rem' }}>
            Human Tem Foundation is a non-profit organization committed to making a difference in the lives of underprivileged communities. We believe in the power of collective action, transparency, and compassion to drive sustainable change. Our dedicated team and volunteers work tirelessly to deliver impactful programs in education, healthcare, empowerment, and more.
          </p>
        </section>
        <section id="work" style={{ maxWidth: 900, margin: '2.5rem auto', padding: '2rem', background: 'rgba(255,255,255,0.96)', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <h2 style={{ color: '#2563eb', fontWeight: 800, fontSize: '2rem', marginBottom: 12 }}>Our Work</h2>
          <p style={{ color: '#444', fontSize: '1.1rem' }}>
            From running free schools and health camps to supporting women and youth through skill development, Human Tem Foundation’s projects are designed to create lasting positive impact. Our work is rooted in community needs and driven by a passion for service and innovation.
          </p>
        </section>
        <section id="involved" style={{ maxWidth: 900, margin: '2.5rem auto', padding: '2rem', background: 'rgba(255,255,255,0.96)', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <h2 style={{ color: '#2563eb', fontWeight: 800, fontSize: '2rem', marginBottom: 12 }}>Get Involved</h2>
          <p style={{ color: '#444', fontSize: '1.1rem' }}>
            Join us as a volunteer, donor, or partner! Human Tem Foundation welcomes everyone who wants to contribute to a better world. Whether you can give your time, resources, or expertise, your involvement will help us reach more lives and build stronger communities.
          </p>
        </section>
        <section id="blogs" style={{ maxWidth: 900, margin: '2.5rem auto', padding: '2rem', background: 'rgba(255,255,255,0.96)', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <h2 style={{ color: '#2563eb', fontWeight: 800, fontSize: '2rem', marginBottom: 12 }}>Blogs</h2>
          <p style={{ color: '#444', fontSize: '1.1rem' }}>
            Explore inspiring stories, updates, and insights from our team and beneficiaries. Our blogs highlight the challenges, successes, and ongoing journey of Human Tem Foundation in bringing hope and opportunity to those in need.
          </p>
        </section>
        <section id="contact" style={{ maxWidth: 900, margin: '2.5rem auto', padding: '2rem', background: 'rgba(255,255,255,0.96)', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <h2 style={{ color: '#2563eb', fontWeight: 800, fontSize: '2rem', marginBottom: 12 }}>Contact Us</h2>
          <p style={{ color: '#444', fontSize: '1.1rem' }}>
            Want to reach out or learn more? Email us at <a href="mailto:info@humantemfoundation.org" style={{ color: '#f59e42', textDecoration: 'underline' }}>info@humantemfoundation.org</a> or call us at <a href="tel:+911234567890" style={{ color: '#f59e42', textDecoration: 'underline' }}>+91-1234567890</a>. We’d love to connect with you!
          </p>
        </section>
      </main>
      <footer style={{ background: 'rgba(30,41,59,0.92)', color: '#fff', textAlign: 'center', padding: '1.2rem 0', fontSize: '1rem', letterSpacing: 0.5, marginTop: 40 }}>
        &copy; {new Date().getFullYear()} Human Tem Foundation. All rights reserved.
      </footer>
      <div style={{ position: 'fixed', bottom: 16, right: 16, zIndex: 100 }}>
        <button className="btn" style={{ background: '#7ed957', color: '#fff', fontWeight: 700, borderRadius: 6, fontSize: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.10)' }}>Feedback</button>
      </div>
    </div>
  );
};

export default Home;
