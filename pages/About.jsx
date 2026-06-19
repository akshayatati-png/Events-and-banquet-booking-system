import React from 'react';

export default function About() {
  return (
    <div className="container py-5">
      {/* About Header */}
      <div className="text-center mb-5">
        <span className="text-warning text-uppercase fw-bold letter-spacing-1">Welcome to Luxury</span>
        <h1 className="display-4 mt-2 mb-3">Grand Palace Hotel</h1>
        <div className="mx-auto bg-warning" style={{ width: '80px', height: '3px' }}></div>
        <p className="lead text-muted col-lg-8 mx-auto mt-3">
          For over three decades, the Grand Palace has stood as a beacon of sophistication, orchestrating unforgettable weddings, celebrations, and corporate gatherings.
        </p>
      </div>

      {/* Row 1: Intro Image & Details */}
      <div className="row g-5 align-items-center mb-5">
        <div className="col-lg-6">
          <div className="position-relative overflow-hidden rounded shadow">
            <img
              src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&auto=format&fit=crop&q=80"
              alt="Grand Palace Exterior"
              className="img-fluid w-100 hover-zoom"
              style={{ objectFit: 'cover', height: '400px' }}
            />
            <div className="position-absolute bottom-0 start-0 bg-warning text-dark px-4 py-2 m-3 rounded fw-bold">
              Est. 1992
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <h2 className="mb-4">Where Luxury Meets Grandeur</h2>
          <p className="text-muted">
            The Grand Palace is not just a location; it is an institution of high-class hosting. Nestled in the heart of Mumbai, we blend historic elegance with state-of-the-art systems to serve our distinguished clients. 
          </p>
          <p className="text-muted">
            Whether hosting an intimate boardroom conference for 20 executives or a spectacular wedding gala for 1200 guests, our meticulously curated event spaces, award-winning culinary teams, and professional coordinators promise flawless execution.
          </p>
          
          <div className="row g-4 mt-2">
            <div className="col-6">
              <div className="d-flex align-items-center gap-3">
                <div className="bg-warning text-white rounded p-2 d-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px' }}>
                  <i className="bi bi-award fs-4"></i>
                </div>
                <div>
                  <h6 className="mb-0">5-Star Luxury</h6>
                  <small className="text-muted">Award-winning Hotel</small>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="d-flex align-items-center gap-3">
                <div className="bg-warning text-white rounded p-2 d-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px' }}>
                  <i className="bi bi-people fs-4"></i>
                </div>
                <div>
                  <h6 className="mb-0">20,000+ Events</h6>
                  <small className="text-muted">Orchestrated Seamlessly</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Mission & Vision Cards */}
      <div className="row g-4 mb-5">
        <div className="col-md-6">
          <div className="card-luxury p-5 h-100">
            <div className="text-warning fs-1 mb-3">
              <i className="bi bi-eye"></i>
            </div>
            <h3 className="mb-3">Our Vision</h3>
            <p className="text-muted mb-0">
              To be globally recognized as the premiere destination for luxury gatherings, fostering celebrations of all scales with refined elegance, sustainable operations, and unforgettable guest journeys.
            </p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card-luxury p-5 h-100">
            <div className="text-warning fs-1 mb-3">
              <i className="bi bi-compass"></i>
            </div>
            <h3 className="mb-3">Our Mission</h3>
            <p className="text-muted mb-0">
              To deliver outstanding personalized service, exquisite gastronomy, and state-of-the-art technological infrastructures, ensuring every event hosted at the Grand Palace transcends expectation and leaves an indelible mark.
            </p>
          </div>
        </div>
      </div>

      {/* Row 3: Our Core Services */}
      <div className="bg-body-tertiary p-5 rounded-4 border">
        <h3 className="text-center mb-5">Exclusive Hotel Services</h3>
        <div className="row g-4">
          <div className="col-md-4 text-center">
            <div className="fs-1 text-warning mb-3">
              <i className="bi bi-egg-fried"></i>
            </div>
            <h5>Premium Catering</h5>
            <p className="text-muted small">
              Our culinary staff compiles standard-setting local and international menu layouts matching any diet preference.
            </p>
          </div>
          <div className="col-md-4 text-center">
            <div className="fs-1 text-warning mb-3">
              <i className="bi bi-brush"></i>
            </div>
            <h5>High-Class Decor</h5>
            <p className="text-muted small">
              Theme setups by expert florists and lights decorators to shape your venue exactly as you envisioned.
            </p>
          </div>
          <div className="col-md-4 text-center">
            <div className="fs-1 text-warning mb-3">
              <i className="bi bi-lightning-charge"></i>
            </div>
            <h5>Modern Sound & AV</h5>
            <p className="text-muted small">
              Integrated microphones, acoustics, 4K digital led projectors, and surround audio networks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
