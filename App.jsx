import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Venues from './pages/Venues';
import VenueDetails from './pages/VenueDetails';
import AVEquipment from './pages/AVEquipment';
import Catering from './pages/Catering';
import Decor from './pages/Decor';
import Booking from './pages/Booking';
import Payment from './pages/Payment';
import Confirmation from './pages/Confirmation';
import BookingHistory from './pages/BookingHistory';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <BookingProvider>
      <Router>
        <div className="d-flex flex-column min-h-screen" style={{ minHeight: '100vh' }}>
          {/* Global Header */}
          <Navbar />

          {/* Dynamic Page Views */}
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/venues" element={<Venues />} />
              <Route path="/venue/:id" element={<VenueDetails />} />
              <Route path="/av" element={<AVEquipment />} />
              <Route path="/catering" element={<Catering />} />
              <Route path="/decor" element={<Decor />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/confirmation/:bookingId" element={<Confirmation />} />
              <Route path="/history" element={<BookingHistory />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              
              {/* Protected Administration Panel */}
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>

          {/* Global Footer */}
          <Footer />
        </div>
      </Router>
    </BookingProvider>
  );
}

export default App;
