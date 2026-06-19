import React, { useState, useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { BookingContext } from '../context/BookingContext';

export default function Venues() {
  const { venues } = useContext(BookingContext);

  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [maxPrice, setMaxPrice] = useState(45000);
  const [minCapacity, setMinCapacity] = useState(0);

  // Reset Filters
  const handleReset = () => {
    setSearchTerm('');
    setMaxPrice(45000);
    setMinCapacity(0);
  };

  // Filter Logic
  const filteredVenues = useMemo(() => {
    return venues.filter(v => {
      const matchesSearch = v.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            v.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice = v.price <= maxPrice;
      const matchesCapacity = v.capacity >= minCapacity;
      
      return matchesSearch && matchesPrice && matchesCapacity;
    });
  }, [venues, searchTerm, maxPrice, minCapacity]);

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <span className="text-warning text-uppercase fw-bold">Explore Our Spaces</span>
        <h1 className="display-4 mt-2 mb-3">Banquet Halls & Venues</h1>
        <div className="mx-auto bg-warning" style={{ width: '80px', height: '3px' }}></div>
      </div>

      {/* Filter panel */}
      <div className="card-luxury p-4 mb-5 bg-body-tertiary">
        <div className="row g-4 align-items-end">
          {/* Search bar */}
          <div className="col-lg-4 col-md-12">
            <label htmlFor="search" className="form-label form-label-luxury">Search Venue Name/Location</label>
            <div className="input-group">
              <span className="input-group-text bg-transparent border-end-0 border-slate" style={{ borderColor: 'var(--border-color)' }}>
                <i className="bi bi-search text-muted"></i>
              </span>
              <input
                type="text"
                id="search"
                className="form-control form-control-luxury border-start-0"
                placeholder="Search (e.g. Royal, Ballroom, Floor...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Price filter */}
          <div className="col-lg-3 col-md-6">
            <div className="d-flex justify-content-between mb-2">
              <label htmlFor="price-slider" className="form-label-luxury mb-0">Max Price: </label>
              <span className="text-warning fw-bold">₹{maxPrice.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              id="price-slider"
              className="form-range"
              min="4000"
              max="40000"
              step="1000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
            <div className="d-flex justify-content-between small text-muted">
              <span>₹4,000</span>
              <span>₹40,000</span>
            </div>
          </div>

          {/* Capacity filter */}
          <div className="col-lg-3 col-md-6">
            <div className="d-flex justify-content-between mb-2">
              <label htmlFor="capacity-slider" className="form-label-luxury mb-0">Min Capacity: </label>
              <span className="text-warning fw-bold">{minCapacity} Guests</span>
            </div>
            <input
              type="range"
              id="capacity-slider"
              className="form-range"
              min="0"
              max="1200"
              step="50"
              value={minCapacity}
              onChange={(e) => setMinCapacity(Number(e.target.value))}
            />
            <div className="d-flex justify-content-between small text-muted">
              <span>0</span>
              <span>1200+</span>
            </div>
          </div>

          {/* Reset button */}
          <div className="col-lg-2 col-md-12 text-center text-lg-end">
            <button className="btn btn-outline-secondary w-100 py-2 d-flex align-items-center justify-content-center gap-2" onClick={handleReset}>
              <i className="bi bi-arrow-counterclockwise"></i> Reset
            </button>
          </div>
        </div>
      </div>

      {/* Venues Grid */}
      {filteredVenues.length === 0 ? (
        <div className="text-center py-5">
          <div className="fs-1 text-muted mb-3">
            <i className="bi bi-calendar-x"></i>
          </div>
          <h3>No Banquet Halls Found</h3>
          <p className="text-muted">Try adjusting your filters or searching for something else.</p>
          <button className="btn btn-gold mt-2" onClick={handleReset}>Clear All Filters</button>
        </div>
      ) : (
        <div className="row g-4">
          {filteredVenues.map(v => (
            <div className="col-lg-4 col-md-6" key={v.id}>
              <div className="card h-100 card-luxury">
                {/* Image */}
                <div className="position-relative overflow-hidden" style={{ height: '240px' }}>
                  <img src={v.image} className="w-100 h-100 img-zoom" style={{ objectFit: 'cover' }} alt={v.name} />
                  <div className="position-absolute top-0 end-0 bg-dark bg-opacity-75 text-warning px-3 py-1 m-3 rounded fw-bold small">
                    <i className="bi bi-star-fill me-1"></i> {v.rating.toFixed(1)}
                  </div>
                </div>

                {/* Content */}
                <div className="card-body d-flex flex-column p-4">
                  <h4 className="card-title text-truncate">{v.name}</h4>
                  
                  <p className="text-muted small mb-2">
                    <i className="bi bi-geo-alt-fill text-warning me-1"></i> {v.location}
                  </p>
                  
                  <p className="text-muted small flex-grow-1 text-truncate-3">{v.description}</p>
                  
                  <div className="row g-2 border-top pt-3 mt-3 align-items-center">
                    <div className="col-6">
                      <div className="d-flex align-items-center gap-2">
                        <i className="bi bi-people-fill text-warning"></i>
                        <div>
                          <small className="text-muted d-block" style={{ fontSize: '0.7rem' }}>Capacity</small>
                          <span className="fw-semibold small">{v.capacity} Guests</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-6 text-end">
                      <small className="text-muted d-block" style={{ fontSize: '0.7rem' }}>Price / Day</small>
                      <span className="text-warning fw-bold fs-5">₹{v.price.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <div className="row g-2 mt-3">
                    <div className="col-6">
                      <Link to={`/venue/${v.id}`} className="btn btn-outline-gold w-100 py-2 btn-sm fw-bold">
                        View Details
                      </Link>
                    </div>
                    <div className="col-6">
                      <Link to={`/booking?venue=${v.id}`} className="btn btn-gold w-100 py-2 btn-sm fw-bold">
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
