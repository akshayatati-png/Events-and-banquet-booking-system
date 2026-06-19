import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { BookingContext } from '../context/BookingContext';

export default function AVEquipment() {
  const { avEquipment } = useContext(BookingContext);
  const [selectedItems, setSelectedItems] = useState({});

  const handleCheckboxChange = (id) => {
    setSelectedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const totalCost = avEquipment.reduce((sum, item) => {
    if (selectedItems[item.id]) {
      return sum + item.price;
    }
    return sum;
  }, 0);

  const icons = {
    'av-projector': 'bi-projector-fill',
    'av-microphone': 'bi-mic-fill',
    'av-led-wall': 'bi-tv-fill',
    'av-sound-system': 'bi-speakers-fill',
    'av-camera': 'bi-camera-video-fill',
    'av-lighting': 'bi-lightbulb-fill'
  };

  const descriptions = {
    'av-projector': '4K UHD laser projector with wide projection wall screen.',
    'av-microphone': 'Professional wireless handheld mics and lapel collar set.',
    'av-led-wall': 'High-definition 10x8ft LED digital backdrop panel display.',
    'av-sound-system': 'Multi-channel surround audio system with JBL amplifiers & subwoofers.',
    'av-camera': 'Full HD PTZ motion tracking cameras for live streams and zooms.',
    'av-lighting': 'RGBWA stage par lights, sharpies, and custom spotlighting presets.'
  };

  // Convert selectedItems map into URL params to pass to booking
  const getBookingLink = () => {
    const selectedIds = Object.keys(selectedItems).filter(key => selectedItems[key]);
    if (selectedIds.length === 0) return '/booking';
    return `/booking?av=${selectedIds.join(',')}`;
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <span className="text-warning text-uppercase fw-bold">Advanced Technologies</span>
        <h1 className="display-4 mt-2 mb-3">AV Equipment Selection</h1>
        <div className="mx-auto bg-warning" style={{ width: '80px', height: '3px' }}></div>
      </div>

      <div className="row g-5">
        {/* Selection Column */}
        <div className="col-lg-8">
          <div className="card-luxury p-4">
            <h3 className="mb-4">Select Hardware Requirements</h3>
            <p className="text-muted mb-4">
              Equip your corporate conventions, wedding stages, or musical celebrations with our state-of-the-art audiovisual solutions. Ensure flawless acoustics and visual highlights for all your guest screens.
            </p>

            <div className="row g-3">
              {avEquipment.map(item => (
                <div className="col-md-6" key={item.id}>
                  <div
                    onClick={() => handleCheckboxChange(item.id)}
                    className={`card p-3 h-100 border cursor-pointer select-none d-flex flex-row align-items-center gap-3 ${
                      selectedItems[item.id] ? 'border-warning bg-warning bg-opacity-10' : 'border-slate'
                    }`}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="d-flex align-items-center">
                      <input
                        type="checkbox"
                        checked={!!selectedItems[item.id]}
                        onChange={() => {}} // handled by parent onClick
                        className="form-check-input border-warning"
                        style={{ transform: 'scale(1.2)' }}
                      />
                    </div>
                    <div className="text-warning fs-3">
                      <i className={`bi ${icons[item.id] || 'bi-gear-fill'}`}></i>
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="mb-0 fw-bold">{item.name}</h6>
                      <small className="text-muted d-block lh-sm mb-1" style={{ fontSize: '0.75rem' }}>{descriptions[item.id]}</small>
                      <span className="text-warning fw-bold small">₹{item.price.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Cost Panel */}
        <div className="col-lg-4">
          <div className="summary-card">
            <h4 className="mb-4 text-center">Rental Calculator</h4>
            
            <div className="border-bottom pb-3 mb-3">
              {avEquipment.filter(i => selectedItems[i.id]).length === 0 ? (
                <p className="text-muted small text-center my-4">No equipment selected. Add items to view breakdown.</p>
              ) : (
                <ul className="list-unstyled mb-0">
                  {avEquipment.filter(i => selectedItems[i.id]).map(item => (
                    <li className="d-flex justify-content-between mb-2 small" key={item.id}>
                      <span><i className="bi bi-check text-warning me-1"></i> {item.name}</span>
                      <span className="font-monospace fw-semibold">₹{item.price.toLocaleString('en-IN')}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4">
              <span className="fw-bold">Total AV Cost:</span>
              <span className="text-warning fs-4 fw-bold font-monospace">₹{totalCost.toLocaleString('en-IN')}</span>
            </div>

            <div className="d-grid gap-2">
              <Link to={getBookingLink()} className="btn btn-gold py-3 fw-bold shadow-sm text-center">
                Add to My Booking
              </Link>
              <Link to="/booking" className="btn btn-outline-secondary btn-sm py-2">
                Skip to Booking Form
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
