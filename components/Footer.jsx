import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-custom mt-auto">
      <div className="container">
        <div className="row g-4 mb-5">
          {/* Brand/About */}
          <div className="col-lg-4 col-md-6">
            <h4 className="navbar-brand-custom mb-3 fs-3">
              <i className="bi bi-bank me-2"></i>GRAND PALACE
            </h4>
            <p className="text-muted pe-lg-4">
              Experience the pinnacle of hospitality and event excellence. From grand weddings to high-profile conventions, we provide elegant halls, stellar services, and memories that last a lifetime.
            </p>
            <div className="d-flex gap-3 mt-3">
              <a href="#" className="btn btn-outline-warning btn-sm rounded-circle d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px' }}>
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="btn btn-outline-warning btn-sm rounded-circle d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px' }}>
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="btn btn-outline-warning btn-sm rounded-circle d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px' }}>
                <i className="bi bi-twitter-x"></i>
              </a>
              <a href="#" className="btn btn-outline-warning btn-sm rounded-circle d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px' }}>
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6">
            <h5 className="text-warning mb-3">Quick Links</h5>
            <Link to="/" className="footer-link">Home</Link>
            <Link to="/venues" className="footer-link">Explore Venues</Link>
            <Link to="/booking" className="footer-link">Book Event</Link>
            <Link to="/history" className="footer-link">Booking History</Link>
            <Link to="/about" className="footer-link">About Us</Link>
          </div>

          {/* Services */}
          <div className="col-lg-3 col-md-6">
            <h5 className="text-warning mb-3">Our Services</h5>
            <Link to="/av" className="footer-link">AV Equipment Rental</Link>
            <Link to="/catering" className="footer-link">Catering Packages</Link>
            <Link to="/decor" className="footer-link">Custom Decor Themes</Link>
            <span className="footer-link">24/7 Concierge Support</span>
            <span className="footer-link">Valet Parking Services</span>
          </div>

          {/* Contact & Newsletter */}
          <div className="col-lg-3 col-md-6">
            <h5 className="text-warning mb-3">Get in Touch</h5>
            <p className="text-muted mb-2 d-flex align-items-start gap-2">
              <i className="bi bi-geo-alt-fill text-warning mt-1"></i>
              <span>777 Luxury Boulevard, Kings Circle, Mumbai, MH 400001, India</span>
            </p>
            <p className="text-muted mb-2 d-flex align-items-center gap-2">
              <i className="bi bi-telephone-fill text-warning"></i>
              <span>+91 22 4567 8900</span>
            </p>
            <p className="text-muted mb-4 d-flex align-items-center gap-2">
              <i className="bi bi-envelope-fill text-warning"></i>
              <span>events@grandpalacehotel.com</span>
            </p>

            <h6 className="text-light mb-2">Subscribe to Newsletter</h6>
            <div className="input-group">
              <input
                type="email"
                className="form-control form-control-luxury bg-dark border-secondary text-white"
                placeholder="Your email"
                aria-label="Your email"
              />
              <button className="btn btn-gold" type="button">Join</button>
            </div>
          </div>
        </div>

        <hr className="border-secondary mb-4" />

        <div className="row">
          <div className="col-md-6 text-center text-md-start text-muted">
            &copy; {currentYear} Grand Palace Hotel. All Rights Reserved.
          </div>
          <div className="col-md-6 text-center text-md-end text-muted mt-2 mt-md-0">
            Designed for Luxury & Perfection.
          </div>
        </div>
      </div>
    </footer>
  );
}
