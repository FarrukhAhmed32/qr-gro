import React, { useState, useEffect } from 'react';
import './App.css';

// SVG Location Pin Icon
const LocationIcon = () => (
  <svg width="14" height="18" viewBox="0 0 14 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="info-icon">
    <path d="M7 0C3.13 0 0 3.13 0 7C0 12.25 7 18 7 18C7 18 14 12.25 14 7C14 3.13 10.87 0 7 0ZM7 9.5C5.62 9.5 4.5 8.38 4.5 7C4.5 5.62 5.62 4.5 7 4.5C8.38 4.5 9.5 5.62 9.5 7C9.5 8.38 8.38 9.5 7 9.5Z" />
  </svg>
);

// SVG Phone Icon
const PhoneIcon = () => (
  <svg width="14" height="14" viewBox="0 0 18 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="info-icon">
    <path d="M3.62 7.79C5.06 10.62 7.38 12.93 10.21 14.38L12.41 12.18C12.69 11.9 13.08 11.82 13.43 11.93C14.55 12.3 15.74 12.5 17 12.5C17.55 12.5 18 12.95 18 13.5V17C18 17.55 17.55 18 17 18C7.62 18 0 10.38 0 1C0 0.45 0.45 0 1 0H4.5C5.05 0 5.5 0.45 5.5 1C5.5 2.26 5.7 3.45 6.07 4.57C6.18 4.92 6.1 5.31 5.82 5.59L3.62 7.79Z" />
  </svg>
);

// Custom Logo for BBQ Tonight Restaurant using local PNG
const BbqLogo = () => (
  <div className="logo-container">
    <img
      src={process.env.PUBLIC_URL ? `${process.env.PUBLIC_URL}/bbq-logo.png` : '/bbq-logo.png'}
      alt="BBQ Tonight Restaurant Logo"
      className="brand-logo-img"
      onError={(e) => {
        e.target.src = '/bbq-logo.png';
      }}
    />
  </div>
);

// Global reusable footer branding component using retale.png image
const FooterBranding = () => (
  <footer className="footer-branding">
    <img
      src={process.env.PUBLIC_URL ? `${process.env.PUBLIC_URL}/retale.png` : '/retale.png'}
      alt="Retale Logo"
      className="footer-logo-img"
      onError={(e) => {
        e.target.src = '/retale.png';
      }}
    />
  </footer>
);

function App() {
  // Form State variables
  const [guests, setGuests] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [highChair, setHighChair] = useState(false);
  const [wheelchair, setWheelchair] = useState(false);
  const [promo, setPromo] = useState(false);

  // UI Modals and Flow States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [waitingCode, setWaitingCode] = useState('');

  // App Phase Control
  // Phases: 'form' -> 'queue' -> 'ready-soon' -> 'left-waitlist'
  const [appPhase, setAppPhase] = useState('form');

  // Background timer redirecting 'queue' phase to 'ready-soon' phase after 10s
  useEffect(() => {
    if (appPhase === 'queue') {
      const timer = setTimeout(() => {
        setAppPhase('ready-soon');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [appPhase]);

  // Form Submission Handler
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Please enter your name';
    if (!phone.trim()) {
      newErrors.phone = 'Please enter your mobile number';
    } else if (!/^\d{9,10}$/.test(phone.trim().replace(/[-\s]/g, ''))) {
      newErrors.phone = 'Please enter a valid 9 or 10-digit mobile number';
    }
    if (!guests) newErrors.guests = 'Please select the number of guests';

    if (Object.keys(newErrors).length > 0) {
      const firstError = Object.keys(newErrors)[0];
      const element = document.getElementById(firstError);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);

    // Simulated API response delay
    setTimeout(() => {
      setIsSubmitting(false);
      const codeNum = Math.floor(10 + Math.random() * 90);
      setWaitingCode(`A${codeNum}`);
      setAppPhase('queue');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1200);
  };

  const handleLeaveWaitlistTrigger = () => {
    setShowLeaveModal(true);
  };

  const handleCloseLeaveModal = () => {
    setShowLeaveModal(false);
    setAppPhase('left-waitlist');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setGuests('');
    setName('');
    setPhone('');
    setHighChair(false);
    setWheelchair(false);
    setPromo(false);
    setWaitingCode('');
    setShowLeaveModal(false);
    setAppPhase('form');
  };

  return (
    <div className="app-viewport">
      <div className={`mobile-shell ${showLeaveModal ? 'modal-open' : ''}`}>

        {/* Leave Waitlist Success Modal */}
        {showLeaveModal && (
          <div className="modal-overlay">
            <div className="success-modal spec-leave-modal">
              <div className="modal-tick-container state-green-circle">
                <svg width="72" height="72" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="32" cy="32" r="30" stroke="#3cd15c" strokeWidth="3.5" fill="none" />
                  <path d="M20 32.5L27.5 40L43 24" stroke="#3cd15c" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="leave-modal-text-message">Leave waitlist successfully!</p>
              <button type="button" className="modal-ok-btn custom-brand-btn" onClick={handleCloseLeaveModal}>
                OK
              </button>
            </div>
          </div>
        )}

        {/* Header Section */}
        <header className="brand-header">
          <div className="brand-header-content">
            <div className="brand-info">
              <h1 className="restaurant-title">BBQ Tonight Restaurant</h1>
              <div className="info-row">
                <LocationIcon />
                <a 
                  href="https://maps.app.goo.gl/9QnBPKt4NBwAAPq6A?g_st=ic" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="info-link info-address-link"
                >
                   5/1, Boating Basin, Clifton,<br />
                   Block 5 Clifton, Karachi
                </a>
              </div>
              <div className="info-row">
                <PhoneIcon />
                <a href="tel:+922137130419" className="info-link">+922137130419.</a>
              </div>
            </div>
            <BbqLogo />
          </div>
        </header>

        {/* Main Content Card Wrapper */}
        <main className="content-card">

          {/* PHASE 1: Join Waitlist Form */}
          {appPhase === 'form' && (
            <form onSubmit={handleSubmit} className="waitlist-form" noValidate>
              <h2 className="card-title">Join The Waitlist</h2>
              <p className="card-subtitle">
                Trying to join the waiting list? leave your information and join the waitlist.
              </p>

              {/* 1. NAME FIELD */}
              <div className="form-group" id="name">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input"
                />
              </div>

              {/* 2. PHONE NUMBER FIELD */}
              <div className="form-group" id="phone">
                <label className="form-label">Phone Number</label>
                <div className="phone-input-group">
                  <span className="phone-prefix">+92</span>
                  <input
                    type="tel"
                    placeholder="Mobile Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    className="form-input phone-main"
                  />
                </div>
              </div>

              {/* 3. NUMBER OF GUESTS FIELD */}
              <div className="form-group" id="guests">
                <label className="form-label">No. of guest</label>
                <div className="select-wrapper">
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className={guests === '' ? 'placeholder-color' : ''}
                  >
                    <option value="" disabled hidden>Select the number of people</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                    ))}
                    <option value="11+">11+ People (Large Party)</option>
                  </select>
                  <div className="select-arrow"></div>
                </div>
              </div>
              {/* SPECIAL REQUESTS HEADING */}
              <div className="form-group">
                <label className="form-label" style={{ marginBottom: '8px', display: 'block' }}>
                  Special Requests
                </label>
              </div>

              {/* 4. HIGH CHAIR FIELD */}
              <div className="checkbox-section">
                <label className="custom-checkbox-container">
                  <input type="checkbox" checked={highChair} onChange={(e) => setHighChair(e.target.checked)} />
                  <span className="checkmark-box"></span>
                  <span className="checkbox-text">High Chair Needed</span>
                </label>
              </div>

              {/* 5. WHEELCHAIR FIELD */}
              <div className="checkbox-section">
                <label className="custom-checkbox-container">
                  <input type="checkbox" checked={wheelchair} onChange={(e) => setWheelchair(e.target.checked)} />
                  <span className="checkmark-box"></span>
                  <span className="checkbox-text">Wheelchair-Accessible Table Needed</span>
                </label>
              </div>

              {/* MARKETING PROMO CHECKBOX */}
              <div className="checkbox-section promo-margin">
                <label className="custom-checkbox-container">
                  <input type="checkbox" checked={promo} onChange={(e) => setPromo(e.target.checked)} />
                  <span className="checkmark-box"></span>
                  <span className="checkbox-text">
                    Receive promo and update messages from this restaurant
                  </span>
                </label>
              </div>

              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? <span className="spinner"></span> : 'JOIN WAITLIST'}
              </button>

              <div className="terms-container">
                By joining the waitlist, you agree to our <a href="#terms" className="terms-link" onClick={e => e.preventDefault()}>terms and conditions</a>.
              </div>
              <div className="disclaimer-note">
                <strong>Note:</strong> Your details will be used only for managing your seating, which is subject to availability.
              </div>
              <FooterBranding />
            </form>
          )}

          {/* PHASE 2: Initial Queue Layout Screen */}
          {appPhase === 'queue' && (
            <div className="waitlist-live-screen layout-fade-in">
              <h2 className="live-user-name">Hi {name || 'Ahmed Ali'}</h2>
              <h3 className="live-status-heading color-brand">You’re in the queue</h3>
              <p className="live-status-subheading color-green">There are 5 parties ahead of you</p>

              <div className="ticket-number-box">
                <p className="ticket-label">Your waiting number is</p>
                <div className="ticket-huge-id">{waitingCode || 'A12'}</div>
                <p className="ticket-party-count">({guests || '4'} guest{parseInt(guests) !== 1 ? 's' : ''})</p>
              </div>

              <p className="share-info-text">Share and let your friends know the status</p>

              <div className="action-buttons-group">
                <button type="button" className="btn-action-fill" onClick={() => alert('Link copied!')}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="icon-svg-spacing">
                    <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                  </svg>
                  Share this link to your friends
                </button>
                <button type="button" className="btn-action-outline" onClick={handleLeaveWaitlistTrigger}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="icon-svg-spacing">
                    <path d="M10 19l-7-7 m0 0l7-7 m-7 7h18" />
                  </svg>
                  Something wrong? Leave waitlist
                </button>
              </div>

              <div className="terms-container m-top-spaced">
                By joining the waitlist, you agree to our <a href="#terms" className="terms-link" onClick={e => e.preventDefault()}>terms and conditions</a>.
              </div>
              <div className="disclaimer-note">
                <strong>Note:</strong> Your details will be used only for managing your seating, which is subject to availability.
              </div>
              <FooterBranding />
            </div>
          )}

          {/* PHASE 3: Dashboard screen ("Your table will be ready soon") */}
          {appPhase === 'ready-soon' && (
            <div className="waitlist-live-screen layout-fade-in">
              <h2 className="live-user-name">Hi {name || 'Ahmed Ali'}</h2>
              <h3 className="live-status-heading color-brand standard-line-height">You’re almost there! Your table will be ready soon.</h3>
              <p className="live-status-subheading color-green">Only 2 parties ahead of you</p>

              <div className="ticket-number-box">
                <p className="ticket-label">Your waiting number is</p>
                <div className="ticket-huge-id">{waitingCode || 'A12'}</div>
                <p className="ticket-party-count">({guests || '4'} guest{parseInt(guests) !== 1 ? 's' : ''})</p>
              </div>

              <p className="share-info-text">Share and let your friends know the status</p>

              <div className="action-buttons-group">
                <button type="button" className="btn-action-fill" onClick={() => alert('Link copied!')}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="icon-svg-spacing">
                    <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                  </svg>
                  Share this link to your friends
                </button>
                <button type="button" className="btn-action-outline" onClick={handleLeaveWaitlistTrigger}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="icon-svg-spacing">
                    <path d="M10 19l-7-7 m0 0l7-7 m-7 7h18" />
                  </svg>
                  Something wrong? Leave waitlist
                </button>
              </div>

              <div className="terms-container m-top-spaced">
                By joining the waitlist, you agree to our <a href="#terms" className="terms-link" onClick={e => e.preventDefault()}>terms and conditions</a>.
              </div>
              <div className="disclaimer-note">
                <strong>Note:</strong> Your details will be used only for managing your seating, which is subject to availability.
              </div>
              <FooterBranding />
            </div>
          )}

          {/* PHASE 4: FINAL SCREEN */}
          {appPhase === 'left-waitlist' && (
            <div className="waitlist-live-screen layout-fade-in">
              <h2 className="live-user-name">Hi {name || 'Ahmed Ali'}</h2>
              <h3 className="live-status-heading color-brand font-weight-medium">you’ve left the waitlist</h3>

              <div className="spacer-block-element"></div>

              <div className="ticket-number-box m-bottom-compact">
                <p className="ticket-label">Your waiting number is</p>
                <div className="ticket-huge-id">{waitingCode || 'A12'}</div>
                <p className="ticket-party-count">({guests || '4'} guest{parseInt(guests) !== 1 ? 's' : ''})</p>
              </div>

              <p className="share-info-text">Share and let your friends know the status</p>

              <div className="action-buttons-group m-bottom-extended">
                <button type="button" className="btn-action-fill" onClick={() => alert('Link copied!')}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="icon-svg-spacing">
                    <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                  </svg>
                  Share this link to your friends
                </button>

                <button type="button" className="btn-action-outline" onClick={handleReset}>
                  Join Waitlist Again
                </button>
              </div>

              <div className="terms-container m-top-spaced">
                By joining the waitlist, you agree to our <a href="#terms" className="terms-link" onClick={e => e.preventDefault()}>terms and conditions</a>.
              </div>
              <div className="disclaimer-note">
                <strong>Note:</strong> Your details will be used only for managing your seating, which is subject to availability.
              </div>
              <FooterBranding />
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

export default App;