import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { BookingContext } from '../context/BookingContext';

export default function BookingHistory() {
  const { bookings, cancelBooking } = useContext(BookingContext);
  const [searchQuery, setSearchQuery] = useState('');

  const handleCancel = (bookingId, venueName, date, slot) => {
    const confirmCancel = window.confirm(
      `Are you sure you want to cancel your reservation for ${venueName} on ${date} (${slot})? This action will release the slot booking.`
    );
    if (confirmCancel) {
      cancelBooking(bookingId);
      alert("Reservation cancelled successfully. The slot has been freed.");
    }
  };

  // Filter Bookings by query
  const filteredBookings = bookings.filter(b => {
    const q = searchQuery.toLowerCase();
    return b.id.toLowerCase().includes(q) || 
           b.customerName.toLowerCase().includes(q) || 
           b.venueName.toLowerCase().includes(q);
  });

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <span className="text-warning text-uppercase fw-bold">My Account</span>
        <h1 className="display-4 mt-2 mb-3">Booking History</h1>
        <div className="mx-auto bg-warning" style={{ width: '80px', height: '3px' }}></div>
      </div>

      <div className="card-luxury p-4">
        {/* Top Controls */}
        <div className="row g-3 justify-content-between align-items-center mb-4">
          <div className="col-md-5">
            <div className="input-group">
              <span className="input-group-text bg-transparent border-end-0" style={{ borderColor: 'var(--border-color)' }}>
                <i className="bi bi-search text-muted"></i>
              </span>
              <input
                type="text"
                className="form-control form-control-luxury border-start-0"
                placeholder="Search Booking ID, Venue, Client..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-4 text-md-end text-muted small">
            Total Bookings Indexed: <strong>{filteredBookings.length}</strong>
          </div>
        </div>

        {/* Bookings Table */}
        {filteredBookings.length === 0 ? (
          <div className="text-center py-5">
            <div className="fs-1 text-muted mb-3">
              <i className="bi bi-journal-x"></i>
            </div>
            <h3>No Bookings Record Found</h3>
            <p className="text-muted">You haven't made any reservations yet, or your search query matches nothing.</p>
            <Link to="/booking" className="btn btn-gold mt-2">Book Your First Event</Link>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle" style={{ color: 'inherit' }}>
              <thead>
                <tr className="border-bottom border-secondary">
                  <th scope="col">Booking ID</th>
                  <th scope="col">Venue / Hall</th>
                  <th scope="col">Date & Slot</th>
                  <th scope="col" className="text-center">Guests</th>
                  <th scope="col" className="text-end">Amount</th>
                  <th scope="col" className="text-center">Status</th>
                  <th scope="col" className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((b) => (
                  <tr key={b.id} className="border-bottom border-light border-opacity-10">
                    <td className="font-monospace fw-bold text-warning">{b.id}</td>
                    <td>
                      <div className="fw-semibold">{b.venueName}</div>
                      <small className="text-muted">{b.eventType}</small>
                    </td>
                    <td>
                      <div><i className="bi bi-calendar3 text-warning me-1 small"></i> {b.eventDate}</div>
                      <small className="text-muted"><i className="bi bi-clock text-warning me-1 small"></i> {b.timeSlot}</small>
                    </td>
                    <td className="text-center">{b.guestCount}</td>
                    <td className="text-end font-monospace fw-semibold">₹{b.amountPaid.toLocaleString('en-IN')}</td>
                    <td className="text-center">
                      <span className={`badge rounded-pill bg-opacity-25 px-3 py-2 ${
                        b.status === 'Confirmed' ? 'bg-success text-success' : 'bg-danger text-danger'
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="text-center">
                      <div className="d-flex justify-content-center gap-2">
                        {/* Details/Invoice link */}
                        <Link to={`/confirmation/${b.id}`} className="btn btn-outline-warning btn-sm" title="View Invoice">
                          <i className="bi bi-receipt"></i>
                        </Link>
                        {/* Cancel option */}
                        {b.status === 'Confirmed' ? (
                          <button
                            onClick={() => handleCancel(b.id, b.venueName, b.eventDate, b.timeSlot)}
                            className="btn btn-outline-danger btn-sm"
                            title="Cancel Booking"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        ) : (
                          <button disabled className="btn btn-outline-secondary btn-sm opacity-50">
                            <i className="bi bi-trash"></i>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
