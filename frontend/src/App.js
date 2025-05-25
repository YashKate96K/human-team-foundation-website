import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import VolunteerDashboard from './pages/VolunteerDashboard';
import BeneficiaryDashboard from './pages/BeneficiaryDashboard';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/PrivateRoute';
import Signup from './pages/Signup';
import Donate from './pages/Donate';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/admin" element={<PrivateRoute role="admin"><AdminDashboard /></PrivateRoute>} />
        <Route path="/volunteer" element={<PrivateRoute role="volunteer"><VolunteerDashboard /></PrivateRoute>} />
        <Route path="/beneficiary" element={<PrivateRoute role="beneficiary"><BeneficiaryDashboard /></PrivateRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
