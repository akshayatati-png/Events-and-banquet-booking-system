import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BookingContext, defaultSlotsList } from '../context/BookingContext';

export default function Booking() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { venues, cateringPackages, decorThemes, avEquipment, getSlotStatus } = useContext(BookingContext);

  // Form Field States
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    eventType: 'Wedding',
    eventDate: '',
    guestCount: 50,
    venueId: '',
    timeSlot: '',
    selectedAV: [], // array of ids
    cateringId: '',
    decorId: ''
  });

  const [errors, setErrors] = useState({});

  // Fetch URL query parameters and pre-fill fields
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const defaultDate = tomorrow.toISOString().split('T')[0];

    const paramVenue = searchParams.get('venue') || (venues.length > 0 ? venues[0].id : '');
    const paramDate = searchParams.get('date') || defaultDate;
    const paramSlot = searchParams.get('slot') || '';
    const paramCatering = searchParams.get('catering') || '';
    const paramDecor = searchParams.get('decor') || '';
    
    // AV Equip list
    let paramAV = [];
    const avQuery = searchParams.get('av');
    if (avQuery) {
      paramAV = avQuery.split(',');
    }

    setFormData(prev => ({
      ...prev,
      venueId: paramVenue,
      eventDate: paramDate,
      timeSlot: paramSlot,
      cateringId: paramCatering,
      decorId: paramDecor,
      selectedAV: paramAV
    }));
  }, [searchParams, venues]);

  // Selected details objects
  const selectedVenue = venues.find(v => v.id === formData.venueId);
  const selectedCatering = cateringPackages.find(c => c.id === formData.cateringId);
  const selectedDecor = decorThemes.find(d => d.id === formData.decorId);

  // AV equipment cost
  const avCost = formData.selectedAV.reduce((sum, itemId) => {
    const item = avEquipment.find(a => a.id === itemId);
    return sum + (item ? item.price : 0);
  }, 0);

  // Catering Cost
  const cateringCost = selectedCatering ? selectedCatering.price * Number(formData.guestCount) : 0;

  // Decor Cost
  const decorCost = selectedDecor ? selectedDecor.price : 0;

  // Venue Cost
  const venueCost = selectedVenue ? selectedVenue.price : 0;

  // Calculation Breakdown
  const subtotal = venueCost + cateringCost + decorCost + avCost;
  const gstTax = subtotal * 0.18; // 18% GST standard hotel tax
  const totalCost = subtotal + gstTax;

  // Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle AV Checkbox
  const handleAVChange = (id) => {
    setFormData(prev => {
      const isSelected = prev.selectedAV.includes(id);
      const newAV = isSelected 
        ? prev.selectedAV.filter(itemId => itemId !== id)
        : [...prev.selectedAV, id];
      return { ...prev, selectedAV: newAV };
    });
  };

  // Form Validation
  const validateForm = () => {
    let tempErrors = {};
    const today = new Date().toISOString().split('T')[0];

    if (!formData.customerName.trim()) tempErrors.customerName = "Customer name is required.";
    
    if (!formData.email.trim()) {
      tempErrors.email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Invalid email formatting.";
    }

    if (!formData.phone.trim()) {
      tempErrors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/[\s-()]/g, ''))) {
      tempErrors.phone = "Phone must be exactly 10 digits.";
    }

    if (!formData.eventDate) {
      tempErrors.eventDate = "Please choose an event date.";
    } else if (formData.eventDate < today) {
      tempErrors.eventDate = "Date cannot be in the past.";
    }

    if (!formData.venueId) {
      tempErrors.venueId = "Please select a banquet hall.";
    }

    if (!formData.timeSlot) {
      tempErrors.timeSlot = "Please choose an available slot.";
    } else if (formData.venueId && formData.eventDate) {
      // Check if slot status is available
      const { status } = getSlotStatus(formData.venueId, formData.eventDate, formData.timeSlot);
      if (status !== 'available') {
        tempErrors.timeSlot = "The selected slot is no longer available.";
      }
    }

    if (Number(formData.guestCount) <= 0) {
      tempErrors.guestCount = "Guest count must be greater than zero.";
    } else if (selectedVenue && Number(formData.guestCount) > selectedVenue.capacity) {
      tempErrors.guestCount = `Guest count exceeds ${selectedVenue.name} capacity of ${selectedVenue.capacity}.`;
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Confirm booking
  const handleConfirm = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Navigate to mock payment page passing full invoice data
      navigate('/payment', {
        state: {
          bookingData: {
            customerName: formData.customerName,
            email: formData.email,
            phone: formData.phone,
            eventType: formData.eventType,
            eventDate: formData.eventDate,
            guestCount: Number(formData.guestCount),
            venueId: formData.venueId,
            venueName: selectedVenue ? selectedVenue.name : '',
            timeSlot: formData.timeSlot,
            selectedAV: formData.selectedAV,
            cateringId: formData.cateringId,
            cateringName: selectedCatering ? selectedCatering.name : 'None',
            decorId: formData.decorId,
            decorName: selectedDecor ? selectedDecor.name : 'None',
            amountPaid: totalCost,
            breakdown: {
              venueCost,
              cateringCost,
              decorCost,
              avCost,
              gstTax,
              totalCost
            }
          }
        }
      });
    } else {
      // Scroll to error
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <span className="text-warning text-uppercase fw-bold">Reservation Desk</span>
        <h1 className="display-4 mt-2 mb-3">Event Booking Form</h1>
        <div className="mx-auto bg-warning" style={{ width: '80px', height: '3px' }}></div>
      </div>

      <form onSubmit={handleConfirm} noValidate>
        <div className="row g-5">
          {/* Left Column: Form Inputs */}
          <div className="col-lg-8">
            <div className="card-luxury p-4 mb-4">
              <h4 className="mb-4 pb-2 border-bottom text-warning"><i className="bi bi-person-fill me-2"></i>Customer Details</h4>
              
              <div className="row g-3">
                <div className="col-md-12">
                  <label htmlFor="customerName" className="form-label form-label-luxury">Full Name</label>
                  <input
                    type="text"
                    id="customerName"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    className={`form-control form-control-luxury ${errors.customerName ? 'is-invalid' : ''}`}
                    placeholder="Enter your full name"
                  />
                  {errors.customerName && <div className="invalid-feedback">{errors.customerName}</div>}
                </div>

                <div className="col-md-6">
                  <label htmlFor="email" className="form-label form-label-luxury">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`form-control form-control-luxury ${errors.email ? 'is-invalid' : ''}`}
                    placeholder="name@example.com"
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                <div className="col-md-6">
                  <label htmlFor="phone" className="form-label form-label-luxury">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`form-control form-control-luxury ${errors.phone ? 'is-invalid' : ''}`}
                    placeholder="10-digit number"
                  />
                  {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                </div>
              </div>
            </div>

            <div className="card-luxury p-4 mb-4">
              <h4 className="mb-4 pb-2 border-bottom text-warning"><i className="bi bi-calendar-event me-2"></i>Event Logistics</h4>
              
              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <label htmlFor="eventType" className="form-label form-label-luxury">Event Category</label>
                  <select
                    id="eventType"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleInputChange}
                    className="form-select form-control-luxury"
                  >
                    <option value="Wedding">Wedding Celebration</option>
                    <option value="Birthday">Birthday Party</option>
                    <option value="Corporate">Corporate Conference</option>
                    <option value="Traditional">Traditional Ceremony</option>
                    <option value="Engagement">Engagement Ceremony</option>
                    <option value="Exhibition">Exhibition / Expo</option>
                    <option value="Social Party">Social Party / Gala</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label htmlFor="guestCount" className="form-label form-label-luxury">Number of Guests</label>
                  <input
                    type="number"
                    id="guestCount"
                    name="guestCount"
                    value={formData.guestCount}
                    onChange={handleInputChange}
                    className={`form-control form-control-luxury ${errors.guestCount ? 'is-invalid' : ''}`}
                    min="1"
                  />
                  {errors.guestCount && <div className="invalid-feedback">{errors.guestCount}</div>}
                  {selectedVenue && <small className="text-muted">Maximum Hall Capacity: {selectedVenue.capacity} guests</small>}
                </div>

                <div className="col-md-6">
                  <label htmlFor="venueId" className="form-label form-label-luxury">Select Hall / Venue</label>
                  <select
                    id="venueId"
                    name="venueId"
                    value={formData.venueId}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, venueId: e.target.value, timeSlot: '' }));
                    }}
                    className={`form-select form-control-luxury ${errors.venueId ? 'is-invalid' : ''}`}
                  >
                    <option value="">-- Choose Venue --</option>
                    {venues.map(v => (
                      <option key={v.id} value={v.id}>{v.name} (Cap: {v.capacity})</option>
                    ))}
                  </select>
                  {errors.venueId && <div className="invalid-feedback">{errors.venueId}</div>}
                </div>

                <div className="col-md-6">
                  <label htmlFor="eventDate" className="form-label form-label-luxury">Event Date</label>
                  <input
                    type="date"
                    id="eventDate"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, eventDate: e.target.value, timeSlot: '' }));
                    }}
                    className={`form-control form-control-luxury ${errors.eventDate ? 'is-invalid' : ''}`}
                    min={new Date().toISOString().split('T')[0]}
                  />
                  {errors.eventDate && <div className="invalid-feedback">{errors.eventDate}</div>}
                </div>
              </div>

              {/* Time Slot Picker inside Form */}
              {formData.venueId && formData.eventDate ? (
                <div className="mb-2">
                  <label className="form-label form-label-luxury d-block">Available Time Slots</label>
                  <div className="row g-2">
                    {defaultSlotsList.map((slotName, idx) => {
                      const { status } = getSlotStatus(formData.venueId, formData.eventDate, slotName);
                      const isSelected = formData.timeSlot === slotName;
                      let btnClass = 'btn-outline-success';
                      let isDisabled = false;

                      if (status === 'booked') {
                        btnClass = 'btn-outline-danger disabled';
                        isDisabled = true;
                      } else if (status === 'blocked') {
                        btnClass = 'btn-outline-secondary disabled';
                        isDisabled = true;
                      } else if (isSelected) {
                        btnClass = 'btn-success text-white';
                      }

                      return (
                        <div className="col-md-4 col-6" key={idx}>
                          <button
                            type="button"
                            disabled={isDisabled}
                            onClick={() => setFormData(prev => ({ ...prev, timeSlot: slotName }))}
                            className={`btn w-100 py-2 small fw-semibold ${btnClass}`}
                          >
                            <div>{slotName}</div>
                            <small style={{ fontSize: '0.65rem' }}>{status.toUpperCase()}</small>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                  {errors.timeSlot && <div className="text-danger small mt-2">{errors.timeSlot}</div>}
                </div>
              ) : (
                <div className="alert alert-info text-center py-3">
                  <i className="bi bi-info-circle-fill me-2"></i> Please select a <strong>Venue</strong> and <strong>Event Date</strong> to check time slot schedules.
                </div>
              )}
            </div>

            <div className="card-luxury p-4 mb-4">
              <h4 className="mb-4 pb-2 border-bottom text-warning"><i className="bi bi-egg-fried me-2"></i>Catering & Custom Decor</h4>
              
              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <label htmlFor="cateringId" className="form-label form-label-luxury">Catering Menu Package</label>
                  <select
                    id="cateringId"
                    name="cateringId"
                    value={formData.cateringId}
                    onChange={handleInputChange}
                    className="form-select form-control-luxury"
                  >
                    <option value="">No Catering (Venue Only)</option>
                    {cateringPackages.map(c => (
                      <option key={c.id} value={c.id}>{c.name} (₹{c.price}/head)</option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6">
                  <label htmlFor="decorId" className="form-label form-label-luxury">Floral & Decor Theme</label>
                  <select
                    id="decorId"
                    name="decorId"
                    value={formData.decorId}
                    onChange={handleInputChange}
                    className="form-select form-control-luxury"
                  >
                    <option value="">No Theme Decor (Standard Venue)</option>
                    {decorThemes.map(d => (
                      <option key={d.id} value={d.id}>{d.name} (₹{d.price.toLocaleString('en-IN')})</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="card-luxury p-4">
              <h4 className="mb-4 pb-2 border-bottom text-warning"><i className="bi bi-projector-fill me-2"></i>AV Hardware & Equipment Add-ons</h4>
              <p className="text-muted small mb-3">Check items you want standard technical engineers to equip in your banquet hall:</p>
              
              <div className="row g-3">
                {avEquipment.map(item => {
                  const isChecked = formData.selectedAV.includes(item.id);
                  return (
                    <div className="col-md-4 col-6" key={item.id}>
                      <div
                        onClick={() => handleAVChange(item.id)}
                        className={`card p-2 border cursor-pointer text-center h-100 select-none ${
                          isChecked ? 'border-warning bg-warning bg-opacity-10 text-warning' : 'border-slate'
                        }`}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="form-check justify-content-center d-flex gap-2">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            checked={isChecked}
                            onChange={() => {}} // handled by click wrapper
                          />
                          <span className="small fw-bold">{item.name}</span>
                        </div>
                        <span className="small text-muted font-monospace mt-1">₹{item.price.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Cost Summary */}
          <div className="col-lg-4">
            <div className="summary-card">
              <h4 className="mb-4 text-center border-bottom pb-2">Booking Summary</h4>
              
              {/* Items Breakdown */}
              <div className="mb-4">
                <div className="d-flex justify-content-between mb-2 pb-2 border-bottom">
                  <div>
                    <h6 className="mb-0 fw-bold">{selectedVenue ? selectedVenue.name : 'No Venue Selected'}</h6>
                    <small className="text-muted">Base Venue Rent</small>
                  </div>
                  <span className="font-monospace fw-semibold">₹{venueCost.toLocaleString('en-IN')}</span>
                </div>

                {selectedCatering && (
                  <div className="d-flex justify-content-between mb-2 pb-2 border-bottom">
                    <div>
                      <h6 className="mb-0 fw-bold">{selectedCatering.name}</h6>
                      <small className="text-muted">₹{selectedCatering.price} x {formData.guestCount} guests</small>
                    </div>
                    <span className="font-monospace fw-semibold">₹{cateringCost.toLocaleString('en-IN')}</span>
                  </div>
                )}

                {selectedDecor && (
                  <div className="d-flex justify-content-between mb-2 pb-2 border-bottom">
                    <div>
                      <h6 className="mb-0 fw-bold">{selectedDecor.name}</h6>
                      <small className="text-muted">Theme Setup</small>
                    </div>
                    <span className="font-monospace fw-semibold">₹{decorCost.toLocaleString('en-IN')}</span>
                  </div>
                )}

                {formData.selectedAV.length > 0 && (
                  <div className="d-flex justify-content-between mb-2 pb-2 border-bottom">
                    <div>
                      <h6 className="mb-0 fw-bold">AV Rental Setup</h6>
                      <small className="text-muted">{formData.selectedAV.length} hardware selected</small>
                    </div>
                    <span className="font-monospace fw-semibold">₹{avCost.toLocaleString('en-IN')}</span>
                  </div>
                )}
              </div>

              {/* Cost Math */}
              <div className="small mb-2 d-flex justify-content-between text-muted">
                <span>Subtotal:</span>
                <span className="font-monospace">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="small mb-4 d-flex justify-content-between text-muted">
                <span>Luxury Tax & GST (18%):</span>
                <span className="font-monospace">₹{gstTax.toLocaleString('en-IN')}</span>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-4 border-top pt-3">
                <span className="fw-bold fs-5">Estimated Total:</span>
                <span className="text-warning fs-3 fw-bold font-monospace">₹{totalCost.toLocaleString('en-IN')}</span>
              </div>

              {/* Slot check indicator */}
              {formData.timeSlot ? (
                <div className="alert alert-success border text-center py-2 mb-4 fs-7">
                  <i className="bi bi-check-circle-fill me-1"></i> Date & Slot Selected
                </div>
              ) : (
                <div className="alert alert-warning border text-center py-2 mb-4 fs-7 text-dark">
                  <i className="bi bi-exclamation-triangle-fill me-1"></i> Time slot required to book
                </div>
              )}

              <button
                type="submit"
                className="btn btn-gold w-100 py-3 fw-bold fs-6 shadow-sm"
              >
                Proceed to Checkout <i className="bi bi-arrow-right-short fs-5 align-middle"></i>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
