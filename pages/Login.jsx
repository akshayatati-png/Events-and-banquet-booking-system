import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookingContext } from '../context/BookingContext';

export default function Login() {
  const navigate = useNavigate();
  const { loginAdmin, adminSession } = useContext(BookingContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Already logged in? Redirect to dashboard
  useEffect(() => {
    if (adminSession.isLoggedIn) {
      navigate('/admin');
    }
  }, [adminSession, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Please fill in both fields.');
      return;
    }

    const success = loginAdmin(username, password);
    if (success) {
      navigate('/admin');
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="container py-5 d-flex align-items-center justify-content-center" style={{ minHeight: '65vh' }}>
      <div className="card-luxury p-4 shadow-lg w-100" style={{ maxWidth: '400px' }}>
        <div className="text-center mb-4">
          <div className="text-warning display-5 mb-2">
            <i className="bi bi-person-workspace"></i>
          </div>
          <h3>Admin Gate</h3>
          <p className="text-muted small">Grand Palace Booking Operations</p>
        </div>

        {error && (
          <div className="alert alert-danger py-2 small d-flex align-items-center gap-2 mb-3" role="alert">
            <i className="bi bi-exclamation-triangle-fill"></i>
            <div>{error}</div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="login-user" className="form-label form-label-luxury">Username</label>
            <input
              type="text"
              id="login-user"
              className="form-control form-control-luxury"
              placeholder="admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="login-pass" className="form-label form-label-luxury">Password</label>
            <input
              type="password"
              id="login-pass"
              className="form-control form-control-luxury"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-gold w-100 py-3 fw-bold">
            <i className="bi bi-box-arrow-in-right me-2"></i>Authenticate
          </button>
        </form>

        <div className="text-center text-muted small mt-4 border-top pt-3">
          <small>Default Credentials:<br />User: <code>admin</code> | Pass: <code>admin123</code></small>
        </div>
      </div>
    </div>
  );
}
