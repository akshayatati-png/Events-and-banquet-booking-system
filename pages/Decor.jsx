import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BookingContext } from '../context/BookingContext';

export default function Decor() {
  const { decorThemes } = useContext(BookingContext);

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <span className="text-warning text-uppercase fw-bold">Ambience & Style</span>
        <h1 className="display-4 mt-2 mb-3">Custom Decor Themes</h1>
        <div className="mx-auto bg-warning" style={{ width: '80px', height: '3px' }}></div>
        <p className="lead text-muted col-lg-8 mx-auto mt-3">
          Transform your venue with our gorgeous thematic setups, designed to align perfectly with your celebrations and corporate guidelines.
        </p>
      </div>

      <div className="row g-4">
        {decorThemes.map(theme => (
          <div className="col-lg-4 col-md-6" key={theme.id}>
            <div className="card h-100 card-luxury d-flex flex-column justify-content-between">
              <div>
                {/* Image */}
                <div className="position-relative overflow-hidden" style={{ height: '220px' }}>
                  <img
                    src={theme.image}
                    alt={theme.name}
                    className="w-100 h-100 img-zoom"
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="position-absolute top-0 end-0 bg-dark bg-opacity-75 text-warning px-3 py-1 m-3 rounded fw-bold small">
                    Theme Setup
                  </div>
                </div>

                {/* Body */}
                <div className="p-4">
                  <h4 className="card-title mb-2">{theme.name}</h4>
                  
                  <div className="text-warning fw-bold fs-5 mb-3">
                    ₹{theme.price.toLocaleString('en-IN')}
                    <span className="small text-muted font-monospace" style={{ fontSize: '0.8rem fw-normal' }}> / flat setup</span>
                  </div>

                  <p className="text-muted small mb-0 lh-base">{theme.description}</p>
                </div>
              </div>

              {/* Action */}
              <div className="p-4 border-top">
                <Link to={`/booking?decor=${theme.id}`} className="btn btn-gold w-100 py-3 fw-bold">
                  Select {theme.name}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 border rounded p-4 text-center bg-body-tertiary">
        <h5>Have specific style boards?</h5>
        <p className="text-muted small mb-0">
          Our in-house florists, lighting technicians, and stage designers can create a completely customized theme from your mood boards. Meet with our lead decorator to plan your layout.
        </p>
        <Link to="/contact" className="btn btn-outline-gold btn-sm mt-3">Schedule Design Meeting</Link>
      </div>
    </div>
  );
}
