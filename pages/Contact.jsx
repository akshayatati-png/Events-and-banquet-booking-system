import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Invalid email format.";
    }
    if (!formData.message.trim()) tempErrors.message = "Message cannot be empty.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <span className="text-warning text-uppercase fw-bold letter-spacing-1">Reach Out To Us</span>
        <h1 className="display-4 mt-2 mb-3">Contact Events Desk</h1>
        <div className="mx-auto bg-warning" style={{ width: '80px', height: '3px' }}></div>
      </div>

      <div className="row g-5">
        {/* Contact Information & Map */}
        <div className="col-lg-5">
          <div className="card-luxury p-4 h-100 d-flex flex-column justify-content-between">
            <div>
              <h3 className="mb-4">Grand Palace Hotel</h3>
              
              <div className="d-flex align-items-start gap-3 mb-3">
                <div className="text-warning fs-4">
                  <i className="bi bi-geo-alt-fill"></i>
                </div>
                <div>
                  <h6 className="mb-1">Address</h6>
                  <p className="text-muted small">777 Luxury Boulevard, Kings Circle, Mumbai, MH 400001, India</p>
                </div>
              </div>

              <div className="d-flex align-items-start gap-3 mb-3">
                <div className="text-warning fs-4">
                  <i className="bi bi-telephone-fill"></i>
                </div>
                <div>
                  <h6 className="mb-1">Phone Number</h6>
                  <p className="text-muted small">+91 22 4567 8900 / +91 22 4567 8901</p>
                </div>
              </div>

              <div className="d-flex align-items-start gap-3 mb-4">
                <div className="text-warning fs-4">
                  <i className="bi bi-envelope-fill"></i>
                </div>
                <div>
                  <h6 className="mb-1">Email Coordinates</h6>
                  <p className="text-muted small">events@grandpalacehotel.com<br />concierge@grandpalacehotel.com</p>
                </div>
              </div>
            </div>

            {/* Mock Map */}
            <div className="overflow-hidden rounded border border-warning" style={{ height: '220px' }}>
              <div className="w-100 h-100 bg-secondary position-relative d-flex flex-column align-items-center justify-content-center text-white" style={{
                backgroundImage: 'radial-gradient(circle, #0b2240 10%, #070f1e 90%)'
              }}>
                <div className="text-warning fs-1 mb-2">
                  <i className="bi bi-map-fill"></i>
                </div>
                <div className="fw-bold">Interactive Location Map</div>
                <div className="small text-muted">Kings Circle, Mumbai</div>
                <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="btn btn-gold btn-sm mt-3 px-3">
                  Open Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="col-lg-7">
          <div className="card-luxury p-4">
            <h3 className="mb-4">Send a Message</h3>
            <p className="text-muted mb-4">
              Have specific questions regarding layout customizations, corporate agreements, or menu pricing? Send us a direct inquiry. Our concierge desk will contact you within 24 hours.
            </p>

            {submitted && (
              <div className="alert alert-success d-flex align-items-center gap-2 mb-4" role="alert">
                <i className="bi bi-check-circle-fill"></i>
                <div>Your inquiry has been successfully sent! Our team will contact you shortly.</div>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-3">
                <label htmlFor="contact-name" className="form-label form-label-luxury">Full Name</label>
                <input
                  type="text"
                  id="contact-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`form-control form-control-luxury ${errors.name ? 'is-invalid' : ''}`}
                  placeholder="Enter your name"
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              </div>

              <div className="mb-3">
                <label htmlFor="contact-email" className="form-label form-label-luxury">Email Address</label>
                <input
                  type="email"
                  id="contact-email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`form-control form-control-luxury ${errors.email ? 'is-invalid' : ''}`}
                  placeholder="name@example.com"
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>

              <div className="mb-4">
                <label htmlFor="contact-message" className="form-label form-label-luxury">Inquiry Message</label>
                <textarea
                  id="contact-message"
                  rows="4"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`form-control form-control-luxury ${errors.message ? 'is-invalid' : ''}`}
                  placeholder="Describe your event requirements (date, guest count, custom request)..."
                ></textarea>
                {errors.message && <div className="invalid-feedback">{errors.message}</div>}
              </div>

              <button type="submit" className="btn btn-gold w-100 py-3 fw-bold">
                <i className="bi bi-send-fill me-2"></i>Send Inquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
