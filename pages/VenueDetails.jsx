import React, { useState, useContext, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { BookingContext, defaultSlotsList } from '../context/BookingContext';

export default function VenueDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { venues, getSlotStatus } = useContext(BookingContext);

  const venue = venues.find(v => v.id === id);

  // States
  const [selectedImage, setSelectedImage] = useState('');
  const [bookingDate, setBookingDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [selectedSlot, setSelectedSlot] = useState('');

  // Handle case where venue doesn't exist
  useEffect(() => {
    if (venue) {
      setSelectedImage(venue.image);
    }
  }, [venue]);

  if (!venue) {
    return (
      <div className="container py-5 text-center">
        <h2>Venue Not Found</h2>
        <p className="text-muted">The venue you are looking for does not exist or has been deleted.</p>
        <Link to="/venues" className="btn btn-gold mt-3">Back to Venues</Link>
      </div>
    );
  }

  // Thumbnails gallery
  const gallery = [
    venue.image,
    'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80'
  ];

  const facilityIcons = {
    'WiFi': 'bi-wifi',
    'Air Conditioning': 'bi-snow',
    'Parking': 'bi-p-circle',
    'Projector': 'bi-projector',
    'Sound System': 'bi-volume-up',
    'LED Display': 'bi-tv'
  };

  const handleSlotSelect = (slotName, status) => {
    if (status === 'available') {
      setSelectedSlot(slotName);
    }
  };

  // Navigate to booking page with selections
  const handleProceedBooking = () => {
    if (!bookingDate) {
      alert("Please select an event date.");
      return;
    }
    if (!selectedSlot) {
      alert("Please select a time slot first.");
      return;
    }
    navigate(`/booking?venue=${venue.id}&date=${bookingDate}&slot=${encodeURIComponent(selectedSlot)}`);
  };

  return (
    <div className="container py-5">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/" className="text-warning text-decoration-none">Home</Link></li>
          <li className="breadcrumb-item"><Link to="/venues" className="text-warning text-decoration-none">Venues</Link></li>
          <li className="breadcrumb-item active text-muted" aria-current="page">{venue.name}</li>
        </ol>
      </nav>

      <div className="row g-5">
        {/* Left Side: Images & Description */}
        <div className="col-lg-7">
          <div className="card-luxury p-3 mb-4">
            {/* Main Image */}
            <div className="overflow-hidden rounded border border-warning mb-3" style={{ height: '400px' }}>
              <img
                src={selectedImage}
                alt={venue.name}
                className="w-100 h-100"
                style={{ objectFit: 'cover' }}
              />
            </div>
            
            {/* Thumbnails */}
            <div className="row g-2">
              {gallery.map((img, index) => (
                <div className="col-3" key={index}>
                  <div
                    onClick={() => setSelectedImage(img)}
                    className={`overflow-hidden rounded border cursor-pointer ${selectedImage === img ? 'border-warning' : 'border-slate'}`}
                    style={{ height: '70px', cursor: 'pointer' }}
                  >
                    <img src={img} className="w-100 h-100" style={{ objectFit: 'cover' }} alt="venue detail" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card-luxury p-4">
            <h3 className="mb-3 border-bottom pb-2">Venue Profile</h3>
            <p className="text-muted">{venue.description}</p>
            <p className="text-muted">
              Designed to create a lasting impression, the hall comes standard with luxury carpets, soundproofing, and customizable dimming options. Event specialists are assigned to every booking to aid with your seating coordinates, stages, and custom food plans.
            </p>

            <h4 className="mt-4 mb-3 border-bottom pb-2">Facilities & Inclusions</h4>
            <div className="row g-3">
              {venue.facilities.map((fac, idx) => (
                <div className="col-md-4 col-6" key={idx}>
                  <div className="d-flex align-items-center gap-2">
                    <div className="text-warning fs-5">
                      <i className={`bi ${facilityIcons[fac] || 'bi-check-circle-fill'}`}></i>
                    </div>
                    <span className="small">{fac}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Slot Availability & Booking Details */}
        <div className="col-lg-5">
          <div className="summary-card">
            <h3 className="mb-1">{venue.name}</h3>
            <p className="text-muted small mb-4">
              <i className="bi bi-geo-alt-fill text-warning me-1"></i> {venue.location}
            </p>

            <div className="bg-body-tertiary p-3 rounded mb-4 border text-center">
              <div className="small text-muted mb-1">Standard Base Booking Price</div>
              <div className="text-warning display-6 fw-bold">₹{venue.price.toLocaleString('en-IN')}</div>
              <div className="small text-muted font-monospace mt-1">Cost covers venue rent for 1 Selected Slot</div>
            </div>

            <h5 className="mb-3 border-bottom pb-2">Venue Availability Manager</h5>
            
            {/* Date Select */}
            <div className="mb-4">
              <label htmlFor="booking-date" className="form-label form-label-luxury">Select Event Date</label>
              <input
                type="date"
                id="booking-date"
                className="form-control form-control-luxury"
                value={bookingDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => {
                  setBookingDate(e.target.value);
                  setSelectedSlot('');
                }}
              />
            </div>

            {/* Slots Selector */}
            <div className="mb-4">
              <label className="form-label form-label-luxury">Select Booking Time Slot</label>
              <div className="slot-grid">
                {defaultSlotsList.map((slotName, index) => {
                  const { status } = getSlotStatus(venue.id, bookingDate, slotName);
                  let statusClass = 'available';
                  let statusText = 'Available';
                  
                  if (status === 'booked') {
                    statusClass = 'booked';
                    statusText = 'Booked';
                  } else if (status === 'blocked') {
                    statusClass = 'blocked';
                    statusText = 'Blocked';
                  }

                  const isSelected = selectedSlot === slotName;

                  return (
                    <button
                      key={index}
                      type="button"
                      disabled={statusClass !== 'available'}
                      onClick={() => handleSlotSelect(slotName, statusClass)}
                      className={`slot-btn ${statusClass} ${isSelected ? 'selected' : ''}`}
                      title={`${slotName} (${statusText})`}
                    >
                      <div className="small mb-1">{slotName}</div>
                      <span className="badge rounded-pill bg-opacity-70" style={{
                        backgroundColor: statusClass === 'available' ? 'var(--accent-green)' : (statusClass === 'booked' ? 'var(--accent-red)' : '#64748b'),
                        fontSize: '0.65rem'
                      }}>
                        {statusText}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Guide Info */}
            <div className="mb-4 small border rounded p-3 bg-body-tertiary">
              <div className="d-flex align-items-center gap-2 mb-1">
                <span className="d-inline-block rounded-circle" style={{ width: '12px', height: '12px', backgroundColor: 'var(--accent-green)' }}></span>
                <span className="text-muted">Green slots are free and ready to book.</span>
              </div>
              <div className="d-flex align-items-center gap-2 mb-1">
                <span className="d-inline-block rounded-circle" style={{ width: '12px', height: '12px', backgroundColor: 'var(--accent-red)' }}></span>
                <span className="text-muted">Red slots are already booked.</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <span className="d-inline-block rounded-circle" style={{ width: '12px', height: '12px', backgroundColor: '#64748b' }}></span>
                <span className="text-muted">Grey slots are blocked for venue maintenance.</span>
              </div>
            </div>

            {/* Book Now trigger */}
            <button
              onClick={handleProceedBooking}
              disabled={!selectedSlot}
              className="btn btn-gold w-100 py-3 fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2"
            >
              <i className="bi bi-calendar-check-fill"></i> Proceed to Booking
            </button>
            {!selectedSlot && (
              <div className="text-center text-muted small mt-2">
                * Please select an available green slot to activate booking.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
