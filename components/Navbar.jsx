import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { BookingContext } from '../context/BookingContext';

export default function Navbar() {
  const { darkMode, toggleDarkMode, adminSession, logoutAdmin } = useContext(BookingContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAdmin();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom shadow">
      <div className="container-fluid">
        <Link className="navbar-brand navbar-brand-custom fs-3 d-flex align-items-center" to="/">
          <i className="bi bi-bank me-2"></i>
          <span>GRAND PALACE</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link nav-link-custom ${isActive ? 'active text-warning' : ''}`} to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link nav-link-custom ${isActive ? 'active text-warning' : ''}`} to="/venues">
                Venues
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link nav-link-custom dropdown-toggle"
                href="#"
                id="servicesDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Services
              </a>
              <ul className="dropdown-menu dropdown-menu-dark border-warning" aria-labelledby="servicesDropdown">
                <li>
                  <Link className="dropdown-item py-2" to="/av">
                    <i className="bi bi-projector me-2"></i>AV Equipment
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item py-2" to="/catering">
                    <i className="bi bi-egg-fried me-2"></i>Catering Packages
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item py-2" to="/decor">
                    <i className="bi bi-flower1 me-2"></i>Decor Themes
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link nav-link-custom ${isActive ? 'active text-warning' : ''}`} to="/booking">
                Booking
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link nav-link-custom ${isActive ? 'active text-warning' : ''}`} to="/history">
                History
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link nav-link-custom ${isActive ? 'active text-warning' : ''}`} to="/about">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link nav-link-custom ${isActive ? 'active text-warning' : ''}`} to="/contact">
                Contact
              </NavLink>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="btn btn-outline-light border-0 rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: '40px', height: '40px' }}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? (
                <i className="bi bi-sun-fill text-warning fs-5"></i>
              ) : (
                <i className="bi bi-moon-fill text-info fs-5"></i>
              )}
            </button>

            {/* Admin Action */}
            {adminSession.isLoggedIn ? (
              <div className="d-flex align-items-center gap-2">
                <Link to="/admin" className="btn btn-outline-warning btn-sm fw-bold">
                  <i className="bi bi-speedometer2 me-1"></i> Dashboard
                </Link>
                <button onClick={handleLogout} className="btn btn-outline-danger btn-sm">
                  <i className="bi bi-box-arrow-right"></i>
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn btn-gold btn-sm">
                <i className="bi bi-person-fill me-1"></i> Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
