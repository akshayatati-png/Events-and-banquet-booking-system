import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BookingContext } from '../context/BookingContext';

export default function Catering() {
  const { cateringPackages } = useContext(BookingContext);

  const images = {
    'cat-silver': 'https://images.unsplash.com/photo-1555244162-803834f70033?w=600&auto=format&fit=crop&q=80',
    'cat-gold': 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80',
    'cat-platinum': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop&q=80'
  };

  const packageColors = {
    'cat-silver': 'text-secondary',
    'cat-gold': 'text-warning',
    'cat-platinum': 'text-info'
  };

  const headerBgs = {
    'cat-silver': 'bg-secondary bg-opacity-10',
    'cat-gold': 'bg-warning bg-opacity-10',
    'cat-platinum': 'bg-info bg-opacity-10'
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <span className="text-warning text-uppercase fw-bold">Gourmet Pleasures</span>
        <h1 className="display-4 mt-2 mb-3">Catering Packages</h1>
        <div className="mx-auto bg-warning" style={{ width: '80px', height: '3px' }}></div>
        <p className="lead text-muted col-lg-8 mx-auto mt-3">
          Savor fine cuisine crafted by our professional culinary team. Choose from our tiered packages or request custom catering items.
        </p>
      </div>

      <div className="row g-4">
        {cateringPackages.map(pkg => (
          <div className="col-lg-4 col-md-6" key={pkg.id}>
            <div className="card h-100 card-luxury d-flex flex-column justify-content-between">
              <div>
                {/* Image */}
                <div className="position-relative overflow-hidden" style={{ height: '200px' }}>
                  <img
                    src={images[pkg.id] || 'https://images.unsplash.com/photo-1555244162-803834f70033?w=600&auto=format&fit=crop&q=80'}
                    alt={pkg.name}
                    className="w-100 h-100 img-zoom"
                    style={{ objectFit: 'cover' }}
                  />
                  <div className={`position-absolute bottom-0 start-0 w-100 text-center py-2 fw-bold text-shadow ${headerBgs[pkg.id]}`} style={{ backdropFilter: 'blur(5px)' }}>
                    <span className={packageColors[pkg.id]}>{pkg.name.toUpperCase()}</span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <div className="text-center mb-4 border-bottom pb-3">
                    <span className="small text-muted d-block">Cost per person</span>
                    <span className="text-warning display-6 fw-bold">₹{pkg.price}</span>
                    <span className="small text-muted font-monospace"> / head</span>
                  </div>

                  <h6 className="fw-bold mb-3"><i className="bi bi-journal-richtext text-warning me-2"></i>Included Menu Items:</h6>
                  <ul className="list-unstyled mb-0">
                    {pkg.items.map((item, idx) => (
                      <li className="d-flex align-items-start gap-2 mb-2 small text-muted" key={idx}>
                        <i className="bi bi-patch-check-fill text-warning mt-1" style={{ fontSize: '0.8rem' }}></i>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action */}
              <div className="p-4 border-top">
                <Link to={`/booking?catering=${pkg.id}`} className="btn btn-gold w-100 py-3 fw-bold">
                  Select {pkg.name}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 border rounded p-4 text-center bg-body-tertiary">
        <h5>Need a custom menu card?</h5>
        <p className="text-muted small">
          We cater to multi-cuisine demands including Authentic Indian, Pan-Asian, Continental, Jain-Friendly, Vegan, and Organic preferences. Contact our Event desk for customizable packages.
        </p>
        <Link to="/contact" className="btn btn-outline-gold btn-sm">Contact Culinary Team</Link>
      </div>
    </div>
  );
}
