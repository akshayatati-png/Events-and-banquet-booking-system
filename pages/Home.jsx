import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { BookingContext } from '../context/BookingContext';

export default function Home() {
  const { venues } = useContext(BookingContext);
  
  // Counter animation states
  const [counts, setCounts] = useState({ halls: 0, events: 0, chefs: 0, rating: 0.0 });

  useEffect(() => {
    const duration = 2000; // 2 seconds animation
    const steps = 50;
    const intervalTime = duration / steps;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      setCounts({
        halls: Math.min(Math.round((6 / steps) * step), 6),
        events: Math.min(Math.round((20000 / steps) * step), 20000),
        chefs: Math.min(Math.round((35 / steps) * step), 35),
        rating: Math.min(parseFloat(((4.9 / steps) * step).toFixed(1)), 4.9)
      });

      if (step >= steps) {
        clearInterval(interval);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  // Filter 3 premium venues for home page
  const featured = venues.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <header className="hero-section" style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1600&auto=format&fit=crop&q=80')`
      }}>
        <div className="hero-overlay"></div>
        <div className="container hero-content text-center py-5">
          <span className="text-warning text-uppercase fw-bold letter-spacing-2 mb-3 d-inline-block">Welcome to Grand Palace</span>
          <h1 className="hero-title text-shadow">Plan Your Perfect Event</h1>
          <p className="hero-subtitle text-shadow">
            Book Luxury Banquet Halls, Gourmet Catering, and State-of-the-Art Event Services
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/venues" className="btn btn-gold btn-lg px-4 py-3 fw-bold">
              Explore Venues <i className="bi bi-arrow-right ms-2"></i>
            </Link>
            <Link to="/booking" className="btn btn-outline-light btn-lg px-4 py-3 fw-bold border-2">
              Book Now
            </Link>
          </div>
        </div>
      </header>

      {/* Animated Counter Section */}
      <section className="bg-dark text-white py-5 border-top border-bottom border-warning">
        <div className="container">
          <div className="row g-4 text-center">
            <div className="col-md-3 col-6">
              <div className="counter-box">
                <i className="bi bi-bank fs-1 text-warning mb-2"></i>
                <div className="counter-number">{counts.halls}+</div>
                <div className="text-uppercase small text-muted">Luxury Halls</div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="counter-box">
                <i className="bi bi-calendar2-check fs-1 text-warning mb-2"></i>
                <div className="counter-number">
                  {counts.events >= 1000 ? `${(counts.events / 1000).toFixed(0)}K` : counts.events}+
                </div>
                <div className="text-uppercase small text-muted">Events Celebrated</div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="counter-box">
                <i className="bi bi-egg-fried fs-1 text-warning mb-2"></i>
                <div className="counter-number">{counts.chefs}+</div>
                <div className="text-uppercase small text-muted">Master Chefs</div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="counter-box">
                <i className="bi bi-star-fill fs-1 text-warning mb-2"></i>
                <div className="counter-number">{counts.rating.toFixed(1)}/5</div>
                <div className="text-uppercase small text-muted">Customer Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Venues Section */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <span className="text-warning text-uppercase fw-bold">Curated Selection</span>
            <h2 className="display-5 mt-2">Featured Banquet Halls</h2>
            <div className="mx-auto bg-warning mt-3" style={{ width: '60px', height: '3px' }}></div>
          </div>

          <div className="row g-4">
            {featured.map(v => (
              <div className="col-lg-4 col-md-6" key={v.id}>
                <div className="card h-100 card-luxury">
                  <div className="position-relative overflow-hidden" style={{ height: '240px' }}>
                    <img src={v.image} className="w-100 h-100 img-zoom" style={{ objectFit: 'cover' }} alt={v.name} />
                    <div className="position-absolute top-0 end-0 bg-dark bg-opacity-75 text-warning px-3 py-1 m-3 rounded fw-bold small">
                      <i className="bi bi-star-fill me-1"></i> {v.rating.toFixed(1)}
                    </div>
                  </div>
                  <div className="card-body d-flex flex-column p-4">
                    <h4 className="card-title text-truncate">{v.name}</h4>
                    <p className="text-muted small mb-3 flex-grow-1 text-truncate-3">{v.description}</p>
                    
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div>
                        <i className="bi bi-people-fill text-muted me-1"></i>
                        <span className="small text-muted">Capacity: {v.capacity} Guests</span>
                      </div>
                      <div className="text-warning fw-bold fs-5">
                        ₹{v.price.toLocaleString('en-IN')}<span className="small text-muted font-monospace" style={{ fontSize: '0.75rem' }}>/day</span>
                      </div>
                    </div>
                    
                    <div className="row g-2">
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
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-5 bg-body-tertiary border-top border-bottom">
        <div className="container">
          <div className="text-center mb-5">
            <span className="text-warning text-uppercase fw-bold">Grand Palace Values</span>
            <h2 className="display-5 mt-2">Why Plan With Us</h2>
            <div className="mx-auto bg-warning mt-3" style={{ width: '60px', height: '3px' }}></div>
          </div>

          <div className="row g-4">
            <div className="col-md-3 col-sm-6">
              <div className="card-luxury p-4 text-center h-100 d-flex flex-column justify-content-center">
                <div className="text-warning fs-1 mb-3">
                  <i className="bi bi-building"></i>
                </div>
                <h5 className="mb-2">Premium Halls</h5>
                <p className="text-muted small mb-0">Meticulously maintained and modern luxury designs matching strict safety guidelines.</p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="card-luxury p-4 text-center h-100 d-flex flex-column justify-content-center">
                <div className="text-warning fs-1 mb-3">
                  <i className="bi bi-egg-fried"></i>
                </div>
                <h5 className="mb-2">Best Catering</h5>
                <p className="text-muted small mb-0">Custom gourmet menus prepared by our Michelin-starred guest chefs and culinary experts.</p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="card-luxury p-4 text-center h-100 d-flex flex-column justify-content-center">
                <div className="text-warning fs-1 mb-3">
                  <i className="bi bi-palette"></i>
                </div>
                <h5 className="mb-2">Decorations</h5>
                <p className="text-muted small mb-0">State-of-the-art stage arrangements, flowers, light displays, and themes.</p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="card-luxury p-4 text-center h-100 d-flex flex-column justify-content-center">
                <div className="text-warning fs-1 mb-3">
                  <i className="bi bi-cash-coin"></i>
                </div>
                <h5 className="mb-2">Affordable Packages</h5>
                <p className="text-muted small mb-0">Transparent pricing systems without hidden costs, with customizable AV rentals.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <span className="text-warning text-uppercase fw-bold">Guest Experiences</span>
            <h2 className="display-5 mt-2">What Our Clients Say</h2>
            <div className="mx-auto bg-warning mt-3" style={{ width: '60px', height: '3px' }}></div>
          </div>

          <div className="row g-4">
            {/* Testimonial 1 */}
            <div className="col-md-4">
              <div className="card-luxury p-4 h-100 d-flex flex-column justify-content-between">
                <div>
                  <div className="text-warning mb-3">
                    <i className="bi bi-star-fill me-1"></i>
                    <i className="bi bi-star-fill me-1"></i>
                    <i className="bi bi-star-fill me-1"></i>
                    <i className="bi bi-star-fill me-1"></i>
                    <i className="bi bi-star-fill"></i>
                  </div>
                  <p className="text-muted fst-italic small">
                    "We hosted our wedding reception in the Royal Banquet Hall and it was absolute perfection! The chandeliers, stage setup, and decor was drop dead gorgeous. The catering was highly praised by all guests."
                  </p>
                </div>
                <div className="d-flex align-items-center gap-3 mt-4">
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop"
                    alt="Client Portrait"
                    className="rounded-circle"
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                  />
                  <div>
                    <h6 className="mb-0">Priya Sharma</h6>
                    <small className="text-muted">Wedding Client</small>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="col-md-4">
              <div className="card-luxury p-4 h-100 d-flex flex-column justify-content-between">
                <div>
                  <div className="text-warning mb-3">
                    <i className="bi bi-star-fill me-1"></i>
                    <i className="bi bi-star-fill me-1"></i>
                    <i className="bi bi-star-fill me-1"></i>
                    <i className="bi bi-star-fill me-1"></i>
                    <i className="bi bi-star-fill"></i>
                  </div>
                  <p className="text-muted fst-italic small">
                    "The Crystal Convention Center was perfect for our tech conference of 1000 attendees. Flawless AV systems, sound, and lighting. The admin team assisted us with quick custom venue settings."
                  </p>
                </div>
                <div className="d-flex align-items-center gap-3 mt-4">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
                    alt="Client Portrait"
                    className="rounded-circle"
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                  />
                  <div>
                    <h6 className="mb-0">Rohan Malhotra</h6>
                    <small className="text-muted">Director, TechCorp</small>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="col-md-4">
              <div className="card-luxury p-4 h-100 d-flex flex-column justify-content-between">
                <div>
                  <div className="text-warning mb-3">
                    <i className="bi bi-star-fill me-1"></i>
                    <i className="bi bi-star-fill me-1"></i>
                    <i className="bi bi-star-fill me-1"></i>
                    <i className="bi bi-star-fill me-1"></i>
                    <i className="bi bi-star-fill"></i>
                  </div>
                  <p className="text-muted fst-italic small">
                    "Organized my daughter's birthday event in the Sapphire meeting room. The theme decoration was balloon-heavy and very colorful. Pricing was extremely fair and the team was cooperative."
                  </p>
                </div>
                <div className="d-flex align-items-center gap-3 mt-4">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop"
                    alt="Client Portrait"
                    className="rounded-circle"
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                  />
                  <div>
                    <h6 className="mb-0">Ananya Verma</h6>
                    <small className="text-muted">Parent</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
