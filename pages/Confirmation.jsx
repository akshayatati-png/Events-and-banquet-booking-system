import React, { useContext, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { BookingContext } from '../context/BookingContext';

export default function Confirmation() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { bookings, venues } = useContext(BookingContext);

  const booking = bookings.find(b => b.id === bookingId);

  useEffect(() => {
    if (!booking) {
      // If direct access and not found, head back to home
      const timer = setTimeout(() => navigate('/'), 5000);
      return () => clearTimeout(timer);
    }
  }, [booking, navigate]);

  if (!booking) {
    return (
      <div className="container py-5 text-center">
        <div className="fs-1 text-danger mb-3">
          <i className="bi bi-x-circle-fill"></i>
        </div>
        <h2>Confirmation Not Found</h2>
        <p className="text-muted">Redirecting you to the home page shortly...</p>
        <Link to="/" className="btn btn-gold mt-2">Go Home Immediately</Link>
      </div>
    );
  }

  const selectedVenue = venues.find(v => v.id === booking.venueId);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container py-5">
      {/* Print View Overrides CSS */}
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            .invoice-print-area, .invoice-print-area * {
              visibility: visible;
            }
            .invoice-print-area {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              padding: 20px;
              color: black !important;
              background-color: white !important;
            }
            .no-print {
              display: none !important;
            }
          }
        `}
      </style>

      {/* Main Confirmation Content */}
      <div className="row justify-content-center">
        <div className="col-lg-8">
          
          {/* Success Banner */}
          <div className="card-luxury p-5 text-center mb-5 border-success border-2 bg-success bg-opacity-10 no-print">
            <div className="text-success display-1 mb-3 animate-bounce">
              <i className="bi bi-patch-check-fill"></i>
            </div>
            <h2 className="text-success mb-2">Booking Confirmed!</h2>
            <p className="text-muted lead mb-4">
              Thank you, {booking.customerName}. Your reservation at the Grand Palace has been successfully locked.
            </p>
            <div className="d-inline-block bg-dark bg-opacity-75 text-warning px-4 py-3 rounded font-monospace fs-4 fw-bold shadow">
              Booking ID: {booking.id}
            </div>
            <p className="text-muted small mt-3 mb-0">
              A confirmation invoice has been sent to your email: <strong>{booking.email}</strong>
            </p>
          </div>

          {/* Printable Invoice Sheet */}
          <div className="invoice-container invoice-print-area border border-warning shadow-lg p-5 mb-5 bg-white text-dark">
            {/* Invoice Header */}
            <div className="row align-items-center mb-4 pb-4 border-bottom border-dark border-opacity-10">
              <div className="col-md-6 text-center text-md-start">
                <h3 className="mb-1 text-primary luxury-font" style={{ color: 'var(--luxury-blue) !important' }}>
                  <i className="bi bi-bank me-2"></i>GRAND PALACE
                </h3>
                <small className="text-muted">777 Luxury Boulevard, Mumbai, MH</small>
              </div>
              <div className="col-md-6 text-center text-md-end mt-3 mt-md-0">
                <h4 className="mb-0 text-uppercase text-secondary">Official Invoice</h4>
                <small className="text-muted">Invoice No: {booking.id}</small><br />
                <small className="text-muted">Date Issued: {new Date(booking.createdAt).toLocaleDateString('en-IN')}</small>
              </div>
            </div>

            {/* Client and Event Logistics */}
            <div className="row mb-4 pb-4 border-bottom border-dark border-opacity-10">
              <div className="col-md-6 mb-3 mb-md-0">
                <h6 className="text-uppercase fw-bold text-muted mb-2">Billed To:</h6>
                <div className="fw-bold">{booking.customerName}</div>
                <div className="small text-muted">{booking.email}</div>
                <div className="small text-muted">+91 {booking.phone}</div>
              </div>
              <div className="col-md-6">
                <h6 className="text-uppercase fw-bold text-muted mb-2">Event Parameters:</h6>
                <div className="small"><strong>Category:</strong> {booking.eventType}</div>
                <div className="small"><strong>Venue:</strong> {booking.venueName} ({selectedVenue?.location})</div>
                <div className="small"><strong>Date:</strong> {booking.eventDate}</div>
                <div className="small"><strong>Slot:</strong> {booking.timeSlot}</div>
                <div className="small"><strong>Guest Count:</strong> {booking.guestCount} Guests</div>
              </div>
            </div>

            {/* Table Cost Breakdowns */}
            <h6 className="text-uppercase fw-bold text-muted mb-3">Service Inclusions Breakdown</h6>
            <div className="table-responsive mb-4">
              <table className="table table-bordered border-dark border-opacity-10">
                <thead className="table-light text-dark">
                  <tr>
                    <th>Particulars / Services</th>
                    <th className="text-end" style={{ width: '150px' }}>Charge (INR)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div><strong>Venue Base Rental</strong></div>
                      <small className="text-muted">Standard daily rental package for {booking.venueName}</small>
                    </td>
                    <td className="text-end font-monospace">₹{booking.breakdown.venueCost.toLocaleString('en-IN')}</td>
                  </tr>

                  {booking.cateringId && (
                    <tr>
                      <td>
                        <div><strong>Gourmet Catering ({booking.cateringName})</strong></div>
                        <small className="text-muted">Catering charges at ₹{booking.cateringId === 'cat-silver' ? 500 : (booking.cateringId === 'cat-gold' ? 1000 : 1500)} x {booking.guestCount} guests</small>
                      </td>
                      <td className="text-end font-monospace">₹{booking.breakdown.cateringCost.toLocaleString('en-IN')}</td>
                    </tr>
                  )}

                  {booking.decorId && (
                    <tr>
                      <td>
                        <div><strong>Scenic Decor Setup ({booking.decorName})</strong></div>
                        <small className="text-muted">Floral drapes, lighting grids, and structural theme setup</small>
                      </td>
                      <td className="text-end font-monospace">₹{booking.breakdown.decorCost.toLocaleString('en-IN')}</td>
                    </tr>
                  )}

                  {booking.breakdown.avCost > 0 && (
                    <tr>
                      <td>
                        <div><strong>AV Hardware & Media Add-ons</strong></div>
                        <small className="text-muted">Microphones, projectors, stage pars, sound systems</small>
                      </td>
                      <td className="text-end font-monospace">₹{booking.breakdown.avCost.toLocaleString('en-IN')}</td>
                    </tr>
                  )}
                  
                  {/* Totals */}
                  <tr className="table-light">
                    <td className="text-end fw-bold">Service Subtotal:</td>
                    <td className="text-end font-monospace fw-bold">₹{(booking.breakdown.venueCost + booking.breakdown.cateringCost + booking.breakdown.decorCost + booking.breakdown.avCost).toLocaleString('en-IN')}</td>
                  </tr>
                  <tr>
                    <td className="text-end text-muted small">Luxury Goods & Service Tax (GST 18%):</td>
                    <td className="text-end font-monospace text-muted small">₹{booking.breakdown.gstTax.toLocaleString('en-IN')}</td>
                  </tr>
                  <tr className="table-dark text-white">
                    <td className="text-end fw-bold fs-5">Grand Total Paid:</td>
                    <td className="text-end font-monospace fw-bold fs-5">₹{booking.amountPaid.toLocaleString('en-IN')}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Terms and Sign */}
            <div className="row align-items-end mt-5 pt-3">
              <div className="col-md-8 text-muted small" style={{ fontSize: '0.75rem' }}>
                <h6>Invoicing Declarations:</h6>
                <ul className="ps-3 mb-0">
                  <li>Payment transaction has been processed and cleared mock gateway protocols.</li>
                  <li>Cancellations are subject to admin policies and slot blocking restrictions.</li>
                  <li>Taxes calculated in accord with standard luxury hotel GST frameworks.</li>
                </ul>
              </div>
              <div className="col-md-4 text-center mt-4 mt-md-0">
                <div className="border-bottom border-dark border-opacity-25 pb-2 font-monospace text-muted small">Grand Palace Registrar</div>
                <div className="small text-muted mt-1">Authorized Digital Seal</div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="d-flex justify-content-center gap-3 no-print">
            <button onClick={handlePrint} className="btn btn-gold px-4 py-3 fw-bold">
              <i className="bi bi-printer-fill me-2"></i> Download / Print Invoice
            </button>
            <Link to="/" className="btn btn-outline-secondary px-4 py-3 fw-bold">
              <i className="bi bi-house-door-fill me-2"></i> Back to Homepage
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
