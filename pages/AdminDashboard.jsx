import React, { useState, useContext } from 'react';
import { BookingContext, defaultSlotsList } from '../context/BookingContext';

export default function AdminDashboard() {
  const {
    venues,
    bookings,
    slots,
    cateringPackages,
    decorThemes,
    addVenue,
    editVenue,
    deleteVenue,
    updateCateringPackage,
    updateDecorTheme,
    cancelBooking,
    blockSlot,
    unblockSlot,
    getSlotStatus,
    getBookingStatistics
  } = useContext(BookingContext);

  // Tab State
  const [activeTab, setActiveTab] = useState('overview');

  // Stats
  const stats = getBookingStatistics();

  // Slot Manager State
  const [selectedVenueId, setSelectedVenueId] = useState(venues[0]?.id || '');
  const [slotDate, setSlotDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });

  // Venue Form State
  const [venueFormMode, setVenueFormMode] = useState('add'); // add | edit
  const [venueForm, setVenueForm] = useState({
    id: '',
    name: '',
    capacity: 100,
    price: 50000,
    location: '',
    image: '',
    description: '',
    facilities: []
  });
  const [showVenueForm, setShowVenueForm] = useState(false);

  // Catering Package Form State
  const [editingCateringId, setEditingCateringId] = useState(null);
  const [cateringForm, setCateringForm] = useState({ id: '', name: '', price: 0, items: [] });

  // Decor Theme Form State
  const [editingDecorId, setEditingDecorId] = useState(null);
  const [decorForm, setDecorForm] = useState({ id: '', name: '', price: 0, description: '', image: '' });

  // --- Handlers ---
  
  // Venue Submit
  const handleVenueSubmit = (e) => {
    e.preventDefault();
    if (!venueForm.name || !venueForm.location || !venueForm.image) {
      alert("Please fill in Name, Location, and Image URL.");
      return;
    }

    const facilitiesArray = typeof venueForm.facilities === 'string' 
      ? venueForm.facilities.split(',').map(f => f.trim()).filter(Boolean)
      : venueForm.facilities;

    const dataToSave = {
      ...venueForm,
      facilities: facilitiesArray.length > 0 ? facilitiesArray : ['WiFi', 'Air Conditioning', 'Parking']
    };

    if (venueFormMode === 'add') {
      addVenue(dataToSave);
      alert("Venue added successfully!");
    } else {
      editVenue(dataToSave);
      alert("Venue updated successfully!");
    }
    
    setShowVenueForm(false);
    resetVenueForm();
  };

  const handleEditVenueClick = (v) => {
    setVenueFormMode('edit');
    setVenueForm({
      id: v.id,
      name: v.name,
      capacity: v.capacity,
      price: v.price,
      location: v.location,
      image: v.image,
      description: v.description,
      facilities: v.facilities.join(', ')
    });
    setShowVenueForm(true);
  };

  const resetVenueForm = () => {
    setVenueForm({
      id: '',
      name: '',
      capacity: 100,
      price: 50000,
      location: '',
      image: '',
      description: '',
      facilities: []
    });
  };

  const handleDeleteVenue = (vid, vname) => {
    if (window.confirm(`Are you sure you want to delete ${vname}? All associated bookings will be marked Cancelled and dates freed.`)) {
      deleteVenue(vid);
      alert("Venue deleted.");
    }
  };

  // Slot block toggle
  const handleToggleBlock = (vid, date, slotName, currentStatus) => {
    if (currentStatus === 'available') {
      blockSlot(vid, date, slotName);
    } else if (currentStatus === 'blocked') {
      unblockSlot(vid, date, slotName);
    }
  };

  // Catering edit
  const handleEditCatering = (pkg) => {
    setEditingCateringId(pkg.id);
    setCateringForm({
      id: pkg.id,
      name: pkg.name,
      price: pkg.price,
      items: pkg.items.join(', ')
    });
  };

  const handleSaveCatering = (e) => {
    e.preventDefault();
    const itemsArray = cateringForm.items.split(',').map(i => i.trim()).filter(Boolean);
    updateCateringPackage({
      ...cateringForm,
      items: itemsArray
    });
    setEditingCateringId(null);
    alert("Catering package updated!");
  };

  // Decor edit
  const handleEditDecor = (theme) => {
    setEditingDecorId(theme.id);
    setDecorForm(theme);
  };

  const handleSaveDecor = (e) => {
    e.preventDefault();
    updateDecorTheme(decorForm);
    setEditingDecorId(null);
    alert("Decor theme updated!");
  };

  // Count slot utilization for selected date and venue
  const getSlotStatsForDate = () => {
    let booked = 0;
    let blocked = 0;
    let available = 0;

    defaultSlotsList.forEach(slotName => {
      const { status } = getSlotStatus(selectedVenueId, slotDate, slotName);
      if (status === 'booked') booked++;
      else if (status === 'blocked') blocked++;
      else available++;
    });

    return { booked, blocked, available };
  };

  const currentDayStats = getSlotStatsForDate();

  return (
    <div className="container-fluid py-5 px-lg-5">
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-5 pb-3 border-bottom">
        <div>
          <span className="text-warning text-uppercase fw-bold">Operations Board</span>
          <h1 className="display-5 mt-1">Management Hub</h1>
        </div>
        <div className="badge bg-warning text-dark fs-6 py-2 px-3">
          <i className="bi bi-person-badge-fill me-2"></i> Admin Level Session
        </div>
      </div>

      {/* Nav Tabs */}
      <ul className="nav nav-tabs border-warning mb-4" id="adminTabs" role="tablist">
        <li className="nav-item">
          <button onClick={() => setActiveTab('overview')} className={`nav-link fw-bold border-bottom-0 ${activeTab === 'overview' ? 'active text-warning bg-secondary bg-opacity-10 border-warning' : 'text-secondary'}`}>
            <i className="bi bi-speedometer2 me-1"></i> Overview
          </button>
        </li>
        <li className="nav-item">
          <button onClick={() => setActiveTab('venues')} className={`nav-link fw-bold border-bottom-0 ${activeTab === 'venues' ? 'active text-warning bg-secondary bg-opacity-10 border-warning' : 'text-secondary'}`}>
            <i className="bi bi-building me-1"></i> Hall Registry
          </button>
        </li>
        <li className="nav-item">
          <button onClick={() => setActiveTab('bookings')} className={`nav-link fw-bold border-bottom-0 ${activeTab === 'bookings' ? 'active text-warning bg-secondary bg-opacity-10 border-warning' : 'text-secondary'}`}>
            <i className="bi bi-journal-text me-1"></i> Bookings Ledger
          </button>
        </li>
        <li className="nav-item">
          <button onClick={() => setActiveTab('slots')} className={`nav-link fw-bold border-bottom-0 ${activeTab === 'slots' ? 'active text-warning bg-secondary bg-opacity-10 border-warning' : 'text-secondary'}`}>
            <i className="bi bi-clock-history me-1"></i> Slot Scheduler
          </button>
        </li>
        <li className="nav-item">
          <button onClick={() => setActiveTab('services')} className={`nav-link fw-bold border-bottom-0 ${activeTab === 'services' ? 'active text-warning bg-secondary bg-opacity-10 border-warning' : 'text-secondary'}`}>
            <i className="bi bi-patch-check me-1"></i> Service Pricing
          </button>
        </li>
      </ul>

      {/* Tab Contents */}
      <div className="tab-content">
        
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div>
            {/* Stat Cards */}
            <div className="row g-4 mb-5">
              <div className="col-lg-3 col-sm-6">
                <div className="card-luxury p-4 bg-primary bg-opacity-10 border-primary text-center">
                  <h6 className="text-uppercase text-muted small">Registered Halls</h6>
                  <div className="display-5 text-primary fw-bold">{stats.totalVenues}</div>
                  <small className="text-muted">Available spaces</small>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="card-luxury p-4 bg-warning bg-opacity-10 border-warning text-center">
                  <h6 className="text-uppercase text-muted small">Total Bookings</h6>
                  <div className="display-5 text-warning fw-bold">{stats.totalBookings}</div>
                  <small className="text-muted">Confirmed & Cancelled</small>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="card-luxury p-4 bg-success bg-opacity-10 border-success text-center">
                  <h6 className="text-uppercase text-muted small">Gross Revenue</h6>
                  <div className="display-5 text-success fw-bold">₹{stats.revenue.toLocaleString('en-IN')}</div>
                  <small className="text-muted">Cleared transaction total</small>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="card-luxury p-4 bg-info bg-opacity-10 border-info text-center">
                  <h6 className="text-uppercase text-muted small">Active/Upcoming</h6>
                  <div className="display-5 text-info fw-bold">{stats.activeEvents}</div>
                  <small className="text-muted">Events scheduled</small>
                </div>
              </div>
            </div>

            {/* Quick charts/stats */}
            <div className="row g-4">
              <div className="col-lg-6">
                <div className="card-luxury p-4 h-100">
                  <h4 className="mb-4"><i className="bi bi-bar-chart-line text-warning me-2"></i>Global Slot Allocations</h4>
                  <div className="py-2">
                    <label className="small text-muted d-block mb-1">Booked Slots ({stats.bookedSlotsCount})</label>
                    <div className="progress mb-3 bg-secondary bg-opacity-25" style={{ height: '25px' }}>
                      <div className="progress-bar bg-danger" role="progressbar" style={{ width: `${stats.totalBookings > 0 ? (stats.bookedSlotsCount / (stats.bookedSlotsCount + stats.blockedSlotsCount || 1)) * 100 : 0}%` }}></div>
                    </div>
                    
                    <label className="small text-muted d-block mb-1">Blocked Slots ({stats.blockedSlotsCount})</label>
                    <div className="progress mb-3 bg-secondary bg-opacity-25" style={{ height: '25px' }}>
                      <div className="progress-bar bg-secondary" role="progressbar" style={{ width: `${stats.totalBookings > 0 ? (stats.blockedSlotsCount / (stats.bookedSlotsCount + stats.blockedSlotsCount || 1)) * 100 : 0}%` }}></div>
                    </div>
                  </div>
                  <div className="alert alert-secondary small mt-3">
                    <i className="bi bi-info-circle-fill me-1"></i> These metrics compute slot totals over the entire calendar lifespan across all halls. Use the <strong>Slot Scheduler</strong> to configure schedules for individual days.
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="card-luxury p-4 h-100">
                  <h4 className="mb-4"><i className="bi bi-clock-history text-warning me-2"></i>Recent Booking Actions</h4>
                  {bookings.length === 0 ? (
                    <p className="text-muted text-center py-4">No recent bookings recorded.</p>
                  ) : (
                    <ul className="list-group list-group-flush" style={{ backgroundColor: 'transparent' }}>
                      {bookings.slice(0, 4).map(b => (
                        <li className="list-group-item d-flex justify-content-between align-items-center bg-transparent border-slate px-0" key={b.id}>
                          <div>
                            <div className="fw-bold">{b.customerName}</div>
                            <small className="text-muted">{b.venueName} | {b.eventDate}</small>
                          </div>
                          <span className={`badge ${b.status === 'Confirmed' ? 'bg-success' : 'bg-danger'}`}>{b.status}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: VENUE MANAGEMENT */}
        {activeTab === 'venues' && (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4>Registered Banquet Halls</h4>
              {!showVenueForm && (
                <button onClick={() => { setVenueFormMode('add'); resetVenueForm(); setShowVenueForm(true); }} className="btn btn-gold">
                  <i className="bi bi-plus-circle me-1"></i> Add New Venue
                </button>
              )}
            </div>

            {/* Form */}
            {showVenueForm && (
              <div className="card-luxury p-4 mb-4 border-warning bg-body-tertiary">
                <h5 className="mb-3">{venueFormMode === 'add' ? 'Create New Banquet Hall' : 'Edit Hall Properties'}</h5>
                <form onSubmit={handleVenueSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label form-label-luxury">Hall Name</label>
                      <input type="text" className="form-control form-control-luxury" value={venueForm.name} onChange={(e) => setVenueForm({ ...venueForm, name: e.target.value })} required />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label form-label-luxury">Max Capacity (Guests)</label>
                      <input type="number" className="form-control form-control-luxury" value={venueForm.capacity} onChange={(e) => setVenueForm({ ...venueForm, capacity: Number(e.target.value) })} required />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label form-label-luxury">Base Rental / Day (₹)</label>
                      <input type="number" className="form-control form-control-luxury" value={venueForm.price} onChange={(e) => setVenueForm({ ...venueForm, price: Number(e.target.value) })} required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label form-label-luxury">Location / Floor</label>
                      <input type="text" className="form-control form-control-luxury" value={venueForm.location} onChange={(e) => setVenueForm({ ...venueForm, location: e.target.value })} required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label form-label-luxury">Unsplash Image URL</label>
                      <input type="url" className="form-control form-control-luxury" value={venueForm.image} onChange={(e) => setVenueForm({ ...venueForm, image: e.target.value })} required />
                    </div>
                    <div className="col-12">
                      <label className="form-label form-label-luxury">Description</label>
                      <textarea rows="3" className="form-control form-control-luxury" value={venueForm.description} onChange={(e) => setVenueForm({ ...venueForm, description: e.target.value })}></textarea>
                    </div>
                    <div className="col-12">
                      <label className="form-label form-label-luxury">Facilities (comma-separated)</label>
                      <input type="text" className="form-control form-control-luxury" placeholder="WiFi, Air Conditioning, Parking, LED Display" value={venueForm.facilities} onChange={(e) => setVenueForm({ ...venueForm, facilities: e.target.value })} />
                    </div>
                  </div>
                  <div className="d-flex gap-2 mt-4">
                    <button type="submit" className="btn btn-gold px-4">{venueFormMode === 'add' ? 'Save Venue' : 'Update Venue'}</button>
                    <button type="button" onClick={() => { setShowVenueForm(false); resetVenueForm(); }} className="btn btn-outline-secondary">Cancel</button>
                  </div>
                </form>
              </div>
            )}

            {/* List Table */}
            <div className="card-luxury p-3">
              <div className="table-responsive">
                <table className="table align-middle" style={{ color: 'inherit' }}>
                  <thead>
                    <tr className="border-bottom border-secondary">
                      <th>Image</th>
                      <th>Hall Name</th>
                      <th>Capacity</th>
                      <th>Price/Day</th>
                      <th>Location</th>
                      <th>Rating</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {venues.map(v => (
                      <tr key={v.id} className="border-bottom border-light border-opacity-10">
                        <td>
                          <img src={v.image} alt={v.name} className="rounded" style={{ width: '60px', height: '40px', objectFit: 'cover' }} />
                        </td>
                        <td className="fw-bold">{v.name}</td>
                        <td>{v.capacity} Guests</td>
                        <td className="font-monospace fw-semibold">₹{v.price.toLocaleString('en-IN')}</td>
                        <td>{v.location}</td>
                        <td><i className="bi bi-star-fill text-warning me-1"></i>{v.rating.toFixed(1)}</td>
                        <td className="text-center">
                          <div className="d-flex justify-content-center gap-2">
                            <button onClick={() => handleEditVenueClick(v)} className="btn btn-outline-warning btn-sm" title="Edit Hall"><i className="bi bi-pencil-square"></i></button>
                            <button onClick={() => handleDeleteVenue(v.id, v.name)} className="btn btn-outline-danger btn-sm" title="Delete Hall"><i className="bi bi-trash"></i></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: BOOKINGS LEDGER */}
        {activeTab === 'bookings' && (
          <div className="card-luxury p-4">
            <h4 className="mb-4">Global Bookings Register</h4>
            {bookings.length === 0 ? (
              <p className="text-muted text-center py-5">No client bookings have been registered yet.</p>
            ) : (
              <div className="table-responsive">
                <table className="table align-middle" style={{ color: 'inherit' }}>
                  <thead>
                    <tr className="border-bottom border-secondary">
                      <th>Booking ID</th>
                      <th>Client Name</th>
                      <th>Venue</th>
                      <th>Event Date</th>
                      <th>Time Slot</th>
                      <th>Guest Count</th>
                      <th className="text-end">Paid Amount</th>
                      <th className="text-center">Status</th>
                      <th className="text-center">Ledger Controls</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map(b => (
                      <tr key={b.id} className="border-bottom border-light border-opacity-10">
                        <td className="font-monospace text-warning fw-bold">{b.id}</td>
                        <td>
                          <div className="fw-bold">{b.customerName}</div>
                          <small className="text-muted">{b.email} | {b.phone}</small>
                        </td>
                        <td>{b.venueName}</td>
                        <td>{b.eventDate}</td>
                        <td><small className="text-muted font-monospace">{b.timeSlot}</small></td>
                        <td className="text-center">{b.guestCount}</td>
                        <td className="text-end font-monospace">₹{b.amountPaid.toLocaleString('en-IN')}</td>
                        <td className="text-center">
                          <span className={`badge ${b.status === 'Confirmed' ? 'bg-success' : 'bg-danger'}`}>{b.status}</span>
                        </td>
                        <td className="text-center">
                          {b.status === 'Confirmed' ? (
                            <button onClick={() => { if(window.confirm(`Cancel booking ${b.id}?`)) cancelBooking(b.id); }} className="btn btn-outline-danger btn-sm fw-bold">
                              Revoke
                            </button>
                          ) : (
                            <button disabled className="btn btn-outline-secondary btn-sm opacity-50">Revoked</button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: SLOT SCHEDULER */}
        {activeTab === 'slots' && (
          <div className="row g-4">
            
            {/* Scheduler selectors */}
            <div className="col-lg-4">
              <div className="card-luxury p-4 h-100 bg-body-tertiary">
                <h5 className="mb-4 border-bottom pb-2 text-warning"><i className="bi bi-sliders me-2"></i>Scheduler Settings</h5>
                
                {/* Select Venue */}
                <div className="mb-3">
                  <label className="form-label form-label-luxury">Select Venue</label>
                  <select className="form-select form-control-luxury" value={selectedVenueId} onChange={(e) => setSelectedVenueId(e.target.value)}>
                    {venues.map(v => (
                      <option key={v.id} value={v.id}>{v.name}</option>
                    ))}
                  </select>
                </div>

                {/* Select Date */}
                <div className="mb-4">
                  <label className="form-label form-label-luxury">Select Schedule Date</label>
                  <input type="date" className="form-control form-control-luxury" value={slotDate} onChange={(e) => setSlotDate(e.target.value)} />
                </div>

                {/* Selected Info Summary */}
                <div className="border rounded p-3 bg-secondary bg-opacity-10 small">
                  <h6 className="fw-bold mb-2">Availability Metrics (For Date):</h6>
                  <div className="d-flex justify-content-between mb-1">
                    <span>Available Slots:</span>
                    <span className="text-success fw-bold">{currentDayStats.available} / 5</span>
                  </div>
                  <div className="d-flex justify-content-between mb-1">
                    <span>Booked (Red):</span>
                    <span className="text-danger fw-bold">{currentDayStats.booked} / 5</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Blocked (Grey):</span>
                    <span className="text-secondary fw-bold">{currentDayStats.blocked} / 5</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Scheduler slot toggle list */}
            <div className="col-lg-8">
              <div className="card-luxury p-4 h-100">
                <h5 className="mb-4 border-bottom pb-2"><i className="bi bi-clock-history text-warning me-2"></i>Date Slots Matrix</h5>
                <p className="text-muted small">
                  Below are the 5 default booking windows. Block slots to prevent online customer booking (e.g. for cleaning, renovations, or VIP blockings).
                </p>

                <div className="list-group mt-3">
                  {defaultSlotsList.map((slotName, index) => {
                    const slotDetail = getSlotStatus(selectedVenueId, slotDate, slotName);
                    const status = slotDetail.status;
                    const bInfo = bookings.find(b => b.id === slotDetail.bookingId);

                    let statusText = 'Available';
                    let bgClass = 'bg-success bg-opacity-10 border-success';
                    let badgeClass = 'bg-success';
                    
                    if (status === 'booked') {
                      statusText = 'Booked';
                      bgClass = 'bg-danger bg-opacity-10 border-danger';
                      badgeClass = 'bg-danger';
                    } else if (status === 'blocked') {
                      statusText = 'Blocked';
                      bgClass = 'bg-secondary bg-opacity-25 border-secondary';
                      badgeClass = 'bg-secondary';
                    }

                    return (
                      <div className={`list-group-item d-flex flex-wrap justify-content-between align-items-center mb-3 p-3 border rounded ${bgClass}`} style={{ color: 'inherit' }} key={index}>
                        <div>
                          <div className="d-flex align-items-center gap-2">
                            <h6 className="mb-0 fw-bold">{slotName}</h6>
                            <span className={`badge rounded-pill ${badgeClass}`}>{statusText}</span>
                          </div>
                          
                          {/* Booked Client Information */}
                          {status === 'booked' && bInfo && (
                            <div className="small text-muted mt-2">
                              <i className="bi bi-person-fill text-warning me-1"></i>Client: <strong>{bInfo.customerName}</strong> | ID: <span className="font-monospace text-warning fw-bold">{bInfo.id}</span><br />
                              <i className="bi bi-telephone-fill me-1"></i>Phone: {bInfo.phone} | Guests: {bInfo.guestCount}
                            </div>
                          )}
                        </div>

                        {/* Controls */}
                        <div className="mt-3 mt-md-0 d-flex gap-2">
                          {status === 'available' && (
                            <button onClick={() => handleToggleBlock(selectedVenueId, slotDate, slotName, 'available')} className="btn btn-outline-secondary btn-sm fw-bold">
                              Block Slot
                            </button>
                          )}
                          {status === 'blocked' && (
                            <button onClick={() => handleToggleBlock(selectedVenueId, slotDate, slotName, 'blocked')} className="btn btn-outline-success btn-sm fw-bold">
                              Unblock Slot
                            </button>
                          )}
                          {status === 'booked' && (
                            <button onClick={() => { if(window.confirm(`Revoke this booking slot?`)) cancelBooking(slotDetail.bookingId); }} className="btn btn-outline-danger btn-sm fw-bold">
                              Cancel Reservation
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 5: SERVICES PRICING MANAGER */}
        {activeTab === 'services' && (
          <div className="row g-4">
            
            {/* Catering Manager */}
            <div className="col-lg-6">
              <div className="card-luxury p-4 h-100">
                <h4 className="mb-4 border-bottom pb-2 text-warning"><i className="bi bi-egg-fried me-2"></i>Catering Packages</h4>
                
                {editingCateringId ? (
                  <form onSubmit={handleSaveCatering} className="border p-3 rounded mb-3 bg-body-tertiary">
                    <h6 className="fw-bold mb-3">Edit Catering: {cateringForm.name}</h6>
                    <div className="mb-3">
                      <label className="form-label small">Price Per Head (₹)</label>
                      <input type="number" className="form-control form-control-luxury form-control-sm" value={cateringForm.price} onChange={(e) => setCateringForm({ ...cateringForm, price: Number(e.target.value) })} required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label small">Menu Inclusions (comma-separated)</label>
                      <textarea rows="3" className="form-control form-control-luxury form-control-sm" value={cateringForm.items} onChange={(e) => setCateringForm({ ...cateringForm, items: e.target.value })} required></textarea>
                    </div>
                    <div className="d-flex gap-2">
                      <button type="submit" className="btn btn-gold btn-sm">Save</button>
                      <button type="button" onClick={() => setEditingCateringId(null)} className="btn btn-outline-secondary btn-sm">Cancel</button>
                    </div>
                  </form>
                ) : null}

                <div className="list-group">
                  {cateringPackages.map(c => (
                    <div className="list-group-item bg-transparent border-slate d-flex justify-content-between align-items-center px-0 py-3" style={{ color: 'inherit' }} key={c.id}>
                      <div>
                        <h6 className="fw-bold mb-1">{c.name}</h6>
                        <span className="badge bg-warning text-dark me-2">₹{c.price} / person</span>
                        <small className="text-muted">{c.items.length} items catalogued</small>
                      </div>
                      <button onClick={() => handleEditCatering(c)} className="btn btn-outline-warning btn-sm">
                        <i className="bi bi-pencil-square"></i> Edit
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Decor Themes Manager */}
            <div className="col-lg-6">
              <div className="card-luxury p-4 h-100">
                <h4 className="mb-4 border-bottom pb-2 text-warning"><i className="bi bi-flower1 me-2"></i>Decor Themes</h4>
                
                {editingDecorId ? (
                  <form onSubmit={handleSaveDecor} className="border p-3 rounded mb-3 bg-body-tertiary">
                    <h6 className="fw-bold mb-3">Edit Decor Theme: {decorForm.name}</h6>
                    <div className="mb-3">
                      <label className="form-label small">Flat Setup Fee (₹)</label>
                      <input type="number" className="form-control form-control-luxury form-control-sm" value={decorForm.price} onChange={(e) => setDecorForm({ ...decorForm, price: Number(e.target.value) })} required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label small">Description Summary</label>
                      <textarea rows="3" className="form-control form-control-luxury form-control-sm" value={decorForm.description} onChange={(e) => setDecorForm({ ...decorForm, description: e.target.value })} required></textarea>
                    </div>
                    <div className="d-flex gap-2">
                      <button type="submit" className="btn btn-gold btn-sm">Save</button>
                      <button type="button" onClick={() => setEditingDecorId(null)} className="btn btn-outline-secondary btn-sm">Cancel</button>
                    </div>
                  </form>
                ) : null}

                <div className="list-group">
                  {decorThemes.map(t => (
                    <div className="list-group-item bg-transparent border-slate d-flex justify-content-between align-items-center px-0 py-3" style={{ color: 'inherit' }} key={t.id}>
                      <div>
                        <h6 className="fw-bold mb-1">{t.name}</h6>
                        <span className="badge bg-warning text-dark me-2">₹{t.price.toLocaleString('en-IN')} flat</span>
                      </div>
                      <button onClick={() => handleEditDecor(t)} className="btn btn-outline-warning btn-sm">
                        <i className="bi bi-pencil-square"></i> Edit
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
