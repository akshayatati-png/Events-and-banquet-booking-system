import React, { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BookingContext } from '../context/BookingContext';

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addBooking } = useContext(BookingContext);

  const bookingData = location.state?.bookingData;

  // States
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const [cardDetails, setCardDetails] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [upiId, setUpiId] = useState('');
  const [netBank, setNetBank] = useState('sbi');
  const [errors, setErrors] = useState({});

  // Safety redirect
  useEffect(() => {
    if (!bookingData) {
      navigate('/booking');
    }
  }, [bookingData, navigate]);

  if (!bookingData) return null;

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({ ...prev, [name]: value }));
  };

  const validatePayment = () => {
    let tempErrors = {};
    if (paymentMethod === 'card') {
      if (!cardDetails.name.trim()) tempErrors.name = "Cardholder name required.";
      if (!/^\d{16}$/.test(cardDetails.number.replace(/\s/g, ''))) {
        tempErrors.number = "Enter valid 16-digit card number.";
      }
      if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(cardDetails.expiry)) {
        tempErrors.expiry = "MM/YY expiry format required.";
      }
      if (!/^\d{3}$/.test(cardDetails.cvv)) {
        tempErrors.cvv = "Enter 3-digit CVV.";
      }
    } else if (paymentMethod === 'upi') {
      if (!upiId.trim() || !upiId.includes('@')) {
        tempErrors.upiId = "Enter a valid UPI ID (e.g. name@okhdfc).";
      }
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handlePayNow = (e) => {
    e.preventDefault();
    if (!validatePayment()) return;

    setLoading(true);

    // Simulate Payment processing
    setTimeout(() => {
      setLoading(false);
      
      // Register booking inside context
      const bookingId = addBooking(bookingData);

      // Navigate to confirmation page
      navigate(`/confirmation/${bookingId}`);
    }, 2500); // 2.5 seconds loading spinner
  };

  return (
    <div className="container py-5">
      {/* Loading overlay */}
      {loading && (
        <div className="loader-overlay flex-column">
          <div className="loader-spinner mb-3"></div>
          <h4 className="text-warning mb-1">Processing Luxury Transaction</h4>
          <p className="text-muted small">Please do not refresh or close this tab...</p>
        </div>
      )}

      <div className="text-center mb-5">
        <span className="text-warning text-uppercase fw-bold">Secure Gateway</span>
        <h1 className="display-4 mt-2 mb-3">Payment Portal</h1>
        <div className="mx-auto bg-warning" style={{ width: '80px', height: '3px' }}></div>
      </div>

      <div className="row g-5 justify-content-center">
        {/* Payment Form details */}
        <div className="col-lg-7">
          <div className="card-luxury p-4 mb-4">
            <h4 className="mb-4 pb-2 border-bottom text-warning"><i className="bi bi-shield-lock-fill me-2"></i>Select Payment Method</h4>

            {/* Methods tabs */}
            <div className="row g-2 mb-4">
              <div className="col-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`btn w-100 py-3 fw-bold small ${paymentMethod === 'card' ? 'btn-gold' : 'btn-outline-gold'}`}
                >
                  <i className="bi bi-credit-card-2-front d-block fs-4 mb-1"></i> Cards
                </button>
              </div>
              <div className="col-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`btn w-100 py-3 fw-bold small ${paymentMethod === 'upi' ? 'btn-gold' : 'btn-outline-gold'}`}
                >
                  <i className="bi bi-qr-code d-block fs-4 mb-1"></i> UPI
                </button>
              </div>
              <div className="col-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbank')}
                  className={`btn w-100 py-3 fw-bold small ${paymentMethod === 'netbank' ? 'btn-gold' : 'btn-outline-gold'}`}
                >
                  <i className="bi bi-bank d-block fs-4 mb-1"></i> NetBanking
                </button>
              </div>
            </div>

            <form onSubmit={handlePayNow} noValidate>
              {/* Card input details */}
              {paymentMethod === 'card' && (
                <div>
                  {/* Mock Graphic Card */}
                  <div className="card-credit mb-4 d-flex flex-column justify-content-between">
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fs-5 fw-bold letter-spacing-1">GRAND PALACE CARD</span>
                      <i className="bi bi-credit-card fs-1 text-warning"></i>
                    </div>
                    <div className="my-3 fs-5 tracking-widest text-center">
                      {cardDetails.number ? cardDetails.number.replace(/(\d{4})/g, '$1 ').trim() : '•••• •••• •••• ••••'}
                    </div>
                    <div className="d-flex justify-content-between text-uppercase small">
                      <div>
                        <div style={{ fontSize: '0.6rem' }} className="text-muted">Holder</div>
                        <div className="fw-bold text-truncate" style={{ maxWidth: '180px' }}>{cardDetails.name || 'Your Name'}</div>
                      </div>
                      <div className="text-end">
                        <div style={{ fontSize: '0.6rem' }} className="text-muted">Expires</div>
                        <div className="fw-bold">{cardDetails.expiry || 'MM/YY'}</div>
                      </div>
                    </div>
                  </div>

                  <div className="row g-3">
                    <div className="col-12">
                      <label htmlFor="card-name" className="form-label form-label-luxury">Cardholder Name</label>
                      <input
                        type="text"
                        id="card-name"
                        name="name"
                        value={cardDetails.name}
                        onChange={handleCardChange}
                        className={`form-control form-control-luxury ${errors.name ? 'is-invalid' : ''}`}
                        placeholder="Enter name on card"
                      />
                      {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>

                    <div className="col-12">
                      <label htmlFor="card-number" className="form-label form-label-luxury">Card Number</label>
                      <input
                        type="text"
                        id="card-number"
                        name="number"
                        maxLength="16"
                        value={cardDetails.number}
                        onChange={handleCardChange}
                        className={`form-control form-control-luxury ${errors.number ? 'is-invalid' : ''}`}
                        placeholder="16-digit debit/credit number"
                      />
                      {errors.number && <div className="invalid-feedback">{errors.number}</div>}
                    </div>

                    <div className="col-md-6 col-6">
                      <label htmlFor="card-expiry" className="form-label form-label-luxury">Expiration (MM/YY)</label>
                      <input
                        type="text"
                        id="card-expiry"
                        name="expiry"
                        maxLength="5"
                        value={cardDetails.expiry}
                        onChange={handleCardChange}
                        className={`form-control form-control-luxury ${errors.expiry ? 'is-invalid' : ''}`}
                        placeholder="MM/YY"
                      />
                      {errors.expiry && <div className="invalid-feedback">{errors.expiry}</div>}
                    </div>

                    <div className="col-md-6 col-6">
                      <label htmlFor="card-cvv" className="form-label form-label-luxury">CVV Code</label>
                      <input
                        type="password"
                        id="card-cvv"
                        name="cvv"
                        maxLength="3"
                        value={cardDetails.cvv}
                        onChange={handleCardChange}
                        className={`form-control form-control-luxury ${errors.cvv ? 'is-invalid' : ''}`}
                        placeholder="3 digits"
                      />
                      {errors.cvv && <div className="invalid-feedback">{errors.cvv}</div>}
                    </div>
                  </div>
                </div>
              )}

              {/* UPI fields */}
              {paymentMethod === 'upi' && (
                <div className="text-center py-3">
                  <div className="mx-auto border p-3 bg-white rounded mb-4" style={{ width: '200px', height: '200px' }}>
                    <div className="w-100 h-100 bg-light d-flex flex-column align-items-center justify-content-center text-dark">
                      <i className="bi bi-qr-code fs-1 text-dark mb-1"></i>
                      <small className="text-muted">UPI QR Code</small>
                      <small className="text-success font-monospace" style={{ fontSize: '0.65rem' }}>₹{bookingData.amountPaid.toLocaleString('en-IN')}</small>
                    </div>
                  </div>
                  
                  <div className="mb-3 text-start max-w-400 mx-auto">
                    <label htmlFor="upiId" className="form-label form-label-luxury">Enter UPI ID</label>
                    <input
                      type="text"
                      id="upiId"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className={`form-control form-control-luxury ${errors.upiId ? 'is-invalid' : ''}`}
                      placeholder="e.g. name@upi"
                    />
                    {errors.upiId && <div className="invalid-feedback">{errors.upiId}</div>}
                  </div>
                </div>
              )}

              {/* NetBanking fields */}
              {paymentMethod === 'netbank' && (
                <div className="py-3">
                  <label htmlFor="bankSelect" className="form-label form-label-luxury">Select Corporate/Retail Bank</label>
                  <select
                    id="bankSelect"
                    value={netBank}
                    onChange={(e) => setNetBank(e.target.value)}
                    className="form-select form-control-luxury"
                  >
                    <option value="sbi">State Bank of India (SBI)</option>
                    <option value="hdfc">HDFC Bank</option>
                    <option value="icici">ICICI Bank</option>
                    <option value="axis">Axis Bank</option>
                    <option value="kotak">Kotak Mahindra</option>
                  </select>
                  <div className="alert alert-secondary mt-4 text-center small">
                    <i className="bi bi-info-circle-fill me-1"></i> You will be redirected to your bank's secure page to complete authorization.
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="btn btn-gold w-100 py-3 mt-4 fw-bold fs-5 d-flex align-items-center justify-content-center gap-2"
              >
                <i className="bi bi-lock-fill"></i> Pay ₹{bookingData.amountPaid.toLocaleString('en-IN')}
              </button>
            </form>
          </div>
        </div>

        {/* Short Summary Sidebar */}
        <div className="col-lg-4">
          <div className="summary-card">
            <h4 className="mb-4 text-center border-bottom pb-2">Order Total</h4>
            
            <div className="mb-3 d-flex justify-content-between small text-muted">
              <span>Hall Base Cost:</span>
              <span className="font-monospace">₹{bookingData.breakdown.venueCost.toLocaleString('en-IN')}</span>
            </div>
            
            {bookingData.breakdown.cateringCost > 0 && (
              <div className="mb-3 d-flex justify-content-between small text-muted">
                <span>Catering Cost:</span>
                <span className="font-monospace">₹{bookingData.breakdown.cateringCost.toLocaleString('en-IN')}</span>
              </div>
            )}

            {bookingData.breakdown.decorCost > 0 && (
              <div className="mb-3 d-flex justify-content-between small text-muted">
                <span>Decor Theme Cost:</span>
                <span className="font-monospace">₹{bookingData.breakdown.decorCost.toLocaleString('en-IN')}</span>
              </div>
            )}

            {bookingData.breakdown.avCost > 0 && (
              <div className="mb-3 d-flex justify-content-between small text-muted">
                <span>AV Equipment:</span>
                <span className="font-monospace">₹{bookingData.breakdown.avCost.toLocaleString('en-IN')}</span>
              </div>
            )}

            <div className="mb-4 d-flex justify-content-between small text-muted">
              <span>Taxes (GST 18%):</span>
              <span className="font-monospace">₹{bookingData.breakdown.gstTax.toLocaleString('en-IN')}</span>
            </div>

            <div className="d-flex justify-content-between align-items-center border-top pt-3 text-warning">
              <span className="fw-bold">Amount Payable:</span>
              <span className="fs-4 fw-bold font-monospace">₹{bookingData.amountPaid.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
