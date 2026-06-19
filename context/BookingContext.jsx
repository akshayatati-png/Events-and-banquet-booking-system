import React, { createContext, useState, useEffect } from 'react';

export const BookingContext = createContext();

// Sample Initial Venues - Reduced prices by 90%
const defaultVenues = [
  {
    id: 'venue-1',
    name: 'Royal Banquet Hall',
    capacity: 500,
    price: 15000,
    rating: 4.8,
    location: 'Ground Floor, Main Wing',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&auto=format&fit=crop&q=80',
    description: 'An elegant, high-ceilinged venue featuring classic chandeliers, gold accents, and a large stage. Perfect for weddings, formal receptions, and grand social celebrations.',
    facilities: ['WiFi', 'Air Conditioning', 'Parking', 'Projector', 'Sound System', 'LED Display']
  },
  {
    id: 'venue-2',
    name: 'Grand Ballroom',
    capacity: 800,
    price: 25000,
    rating: 4.9,
    location: 'First Floor, Luxury Wing',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=80',
    description: 'Our largest and most magnificent venue, featuring state-of-the-art acoustics, customizable lighting, and a spacious pre-function area. Ideal for large conferences, balls, and major conventions.',
    facilities: ['WiFi', 'Air Conditioning', 'Parking', 'Projector', 'Sound System', 'LED Display']
  },
  {
    id: 'venue-3',
    name: 'Crystal Convention Center',
    capacity: 1200,
    price: 40000,
    rating: 5.0,
    location: 'West Wing Pavilion',
    image: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800&auto=format&fit=crop&q=80',
    description: 'A modern, massive, open-concept convention hall featuring pillarless layout and high load capacity. Designed for major corporate exhibitions, trade shows, and international summits.',
    facilities: ['WiFi', 'Air Conditioning', 'Parking', 'Projector', 'Sound System', 'LED Display']
  },
  {
    id: 'venue-4',
    name: 'Diamond Event Hall',
    capacity: 300,
    price: 10000,
    rating: 4.6,
    location: 'East Wing, Garden Level',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&auto=format&fit=crop&q=80',
    description: 'A beautiful glass-walled hall offering panoramic views of the hotel gardens. Great for evening cocktail parties, corporate banquets, and engagement ceremonies.',
    facilities: ['WiFi', 'Air Conditioning', 'Parking', 'Sound System', 'LED Display']
  },
  {
    id: 'venue-5',
    name: 'Sapphire Meeting Room',
    capacity: 50,
    price: 4000,
    rating: 4.5,
    location: 'Executive Floor',
    image: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=800&auto=format&fit=crop&q=80',
    description: 'A executive board room styled venue with ergonomic seating, soundproofing, and advanced presentation screens. Tailored for corporate board meetings, press meets, and workshops.',
    facilities: ['WiFi', 'Air Conditioning', 'Projector', 'Sound System']
  },
  {
    id: 'venue-6',
    name: 'Emerald Banquet Hall',
    capacity: 250,
    price: 9000,
    rating: 4.7,
    location: 'North Wing Terrace',
    image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800&auto=format&fit=crop&q=80',
    description: 'An indoor-outdoor venue with an adjacent open terrace. Perfectly suited for family get-togethers, birthday celebrations, and cultural festivals.',
    facilities: ['WiFi', 'Air Conditioning', 'Parking', 'Sound System']
  }
];

// Initial Catering Packages - Reduced prices
const defaultCatering = [
  {
    id: 'cat-silver',
    name: 'Silver Package',
    price: 150,
    items: ['2 Mocktails', '2 Starters (Veg)', '3 Main Course Dishes', '2 Desserts', 'Assorted Roti & Naan', 'Mineral Water']
  },
  {
    id: 'cat-gold',
    name: 'Gold Package',
    price: 300,
    items: ['3 Mocktails & Juices', '4 Starters (Veg/Non-Veg)', '4 Main Course Dishes', '3 Desserts & Ice Cream', 'Salad Bar & Soup', 'Premium Assorted Breads', 'Mineral Water & Soft Drinks']
  },
  {
    id: 'cat-platinum',
    name: 'Platinum Package',
    price: 500,
    items: ['Unlimited Mocktails, Shakes & Juices', '6 Premium Starters (Veg/Non-Veg)', '6 Main Course Dishes (Exotic Cuisines)', '4 Premium Desserts & Ice Cream Bar', 'Soups, International Salads & Sides', 'Live Pasta / Chaat Counter', 'Assorted Breads & Garlic Naan', 'Unlimited Bottled Mineral Water']
  }
];

// Initial Decor Themes - Reduced prices
const defaultDecor = [
  {
    id: 'dec-wedding',
    name: 'Wedding Theme',
    price: 7500,
    image: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=600&auto=format&fit=crop&q=80',
    description: 'Romantic floral backdrop, gold-themed stage seating, red carpet, walk-in floral arches, table candelabras, and crystal chandeliers.'
  },
  {
    id: 'dec-birthday',
    name: 'Birthday Theme',
    price: 3000,
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&auto=format&fit=crop&q=80',
    description: 'Vibrant balloon cascades, customized neon name board, interactive photobooth, theme prop cutouts, and sound-responsive party LED lighting.'
  },
  {
    id: 'dec-corporate',
    name: 'Corporate Theme',
    price: 5000,
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&auto=format&fit=crop&q=80',
    description: 'Minimalist brand-integrated backdrop, official podium setup, executive registration desk, geometric centerpieces, and neat spotlighting.'
  },
  {
    id: 'dec-traditional',
    name: 'Traditional Theme',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&auto=format&fit=crop&q=80',
    description: 'Traditional marigold & jasmine flower drapes, ethnic brass lamps (diyas), colorful rangoli floor art, and royal low-seating divans.'
  },
  {
    id: 'dec-engagement',
    name: 'Engagement Theme',
    price: 4000,
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&auto=format&fit=crop&q=80',
    description: 'Fairy light curtains, geometric metal arches with pastel florals, personalized couple initials signage, and elegant champagne/cake table.'
  }
];

// Initial AV Equipment Options - Reduced prices
const defaultAV = [
  { id: 'av-projector', name: 'Projector', price: 500 },
  { id: 'av-microphone', name: 'Microphone', price: 150 },
  { id: 'av-led-wall', name: 'LED Wall', price: 2500 },
  { id: 'av-sound-system', name: 'Sound System', price: 1000 },
  { id: 'av-camera', name: 'Conference Camera', price: 800 },
  { id: 'av-lighting', name: 'Stage Lighting', price: 1200 }
];

export const defaultSlotsList = [
  '09:00 AM - 12:00 PM',
  '12:00 PM - 02:00 PM',
  '02:00 PM - 05:00 PM',
  '06:00 PM - 09:00 PM',
  '09:00 PM - 11:00 PM'
];

export const BookingProvider = ({ children }) => {
  // Load initial data from localStorage with namespace version v4 to trigger reload of values
  const [venues, setVenues] = useState(() => {
    const saved = localStorage.getItem('grand_palace_v4_venues');
    return saved ? JSON.parse(saved) : defaultVenues;
  });

  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('grand_palace_v4_bookings');
    return saved ? JSON.parse(saved) : [];
  });

  const [slots, setSlots] = useState(() => {
    const saved = localStorage.getItem('grand_palace_v4_slots');
    return saved ? JSON.parse(saved) : [];
  });

  const [cateringPackages, setCateringPackages] = useState(() => {
    const saved = localStorage.getItem('grand_palace_v4_catering');
    return saved ? JSON.parse(saved) : defaultCatering;
  });

  const [decorThemes, setDecorThemes] = useState(() => {
    const saved = localStorage.getItem('grand_palace_v4_decor');
    return saved ? JSON.parse(saved) : defaultDecor;
  });

  const [avEquipment] = useState(defaultAV);

  const [adminSession, setAdminSession] = useState(() => {
    const saved = localStorage.getItem('grand_palace_v4_admin_session');
    return saved ? JSON.parse(saved) : { isLoggedIn: false };
  });

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('grand_palace_v4_dark_mode');
    return saved ? JSON.parse(saved) === 'true' : false;
  });

  // Sync state with localStorage on changes
  useEffect(() => {
    localStorage.setItem('grand_palace_v4_venues', JSON.stringify(venues));
  }, [venues]);

  useEffect(() => {
    localStorage.setItem('grand_palace_v4_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('grand_palace_v4_slots', JSON.stringify(slots));
  }, [slots]);

  useEffect(() => {
    localStorage.setItem('grand_palace_v4_catering', JSON.stringify(cateringPackages));
  }, [cateringPackages]);

  useEffect(() => {
    localStorage.setItem('grand_palace_v4_decor', JSON.stringify(decorThemes));
  }, [decorThemes]);

  useEffect(() => {
    localStorage.setItem('grand_palace_v4_admin_session', JSON.stringify(adminSession));
  }, [adminSession]);

  useEffect(() => {
    localStorage.setItem('grand_palace_v4_dark_mode', String(darkMode));
    if (darkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [darkMode]);

  // Dark Mode Toggle
  const toggleDarkMode = () => setDarkMode(prev => !prev);

  // Admin Login/Logout
  const loginAdmin = (username, password) => {
    if (username === 'admin' && password === 'admin123') {
      setAdminSession({ isLoggedIn: true, username: 'admin' });
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setAdminSession({ isLoggedIn: false });
  };

  // Venue Operations
  const addVenue = (venue) => {
    const newVenue = {
      ...venue,
      id: `venue-${Date.now()}`,
      rating: parseFloat(venue.rating || 5.0),
      capacity: parseInt(venue.capacity),
      price: parseFloat(venue.price)
    };
    setVenues(prev => [newVenue, ...prev]);
  };

  const editVenue = (updatedVenue) => {
    setVenues(prev => prev.map(v => v.id === updatedVenue.id ? {
      ...updatedVenue,
      capacity: parseInt(updatedVenue.capacity),
      price: parseFloat(updatedVenue.price),
      rating: parseFloat(updatedVenue.rating)
    } : v));
  };

  const deleteVenue = (venueId) => {
    setVenues(prev => prev.filter(v => v.id !== venueId));
    setSlots(prev => prev.filter(s => s.venueId !== venueId));
    setBookings(prev => prev.map(b => b.venueId === venueId ? { ...b, status: 'Cancelled' } : b));
  };

  // Catering Package Operations
  const updateCateringPackage = (pkg) => {
    setCateringPackages(prev => prev.map(p => p.id === pkg.id ? pkg : p));
  };

  // Decor Theme Operations
  const updateDecorTheme = (theme) => {
    setDecorThemes(prev => prev.map(t => t.id === theme.id ? theme : t));
  };

  // Slot Availability Helpers
  const getSlotStatus = (venueId, date, slotName) => {
    const found = slots.find(s => s.venueId === venueId && s.date === date && s.slotName === slotName);
    if (!found) return { status: 'available' };
    return { status: found.status, bookingId: found.bookingId };
  };

  // Slot Management: Block / Unblock manually by admin
  const blockSlot = (venueId, date, slotName) => {
    const exists = slots.find(s => s.venueId === venueId && s.date === date && s.slotName === slotName);
    if (exists) {
      if (exists.status === 'available') {
        setSlots(prev => prev.map(s => s.id === exists.id ? { ...s, status: 'blocked' } : s));
      }
    } else {
      const newSlot = {
        id: `slot-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        venueId,
        date,
        slotName,
        status: 'blocked',
        bookingId: null
      };
      setSlots(prev => [...prev, newSlot]);
    }
  };

  const unblockSlot = (venueId, date, slotName) => {
    const exists = slots.find(s => s.venueId === venueId && s.date === date && s.slotName === slotName);
    if (exists) {
      if (exists.status === 'blocked') {
        setSlots(prev => prev.filter(s => s.id !== exists.id));
      } else if (exists.status === 'booked' && exists.bookingId) {
        cancelBooking(exists.bookingId);
      }
    }
  };

  // Booking Operations
  const addBooking = (bookingData) => {
    const bookingId = `GP-${Math.floor(10000 + Math.random() * 90000)}`;
    const newBooking = {
      ...bookingData,
      id: bookingId,
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    };

    setBookings(prev => [newBooking, ...prev]);

    const newSlotRecord = {
      id: `slot-${Date.now()}`,
      venueId: bookingData.venueId,
      date: bookingData.eventDate,
      slotName: bookingData.timeSlot,
      status: 'booked',
      bookingId: bookingId
    };

    setSlots(prev => [...prev, newSlotRecord]);

    return bookingId;
  };

  const cancelBooking = (bookingId) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'Cancelled' } : b));
    setSlots(prev => prev.filter(s => s.bookingId !== bookingId));
  };

  // Statistics
  const getBookingStatistics = () => {
    const totalVenues = venues.length;
    const totalBookings = bookings.length;
    const confirmedBookings = bookings.filter(b => b.status === 'Confirmed');
    const revenue = confirmedBookings.reduce((sum, b) => sum + parseFloat(b.amountPaid || 0), 0);
    const todayStr = new Date().toISOString().split('T')[0];
    const activeEvents = confirmedBookings.filter(b => b.eventDate >= todayStr).length;
    const bookedSlotsCount = slots.filter(s => s.status === 'booked').length;
    const blockedSlotsCount = slots.filter(s => s.status === 'blocked').length;

    return {
      totalVenues,
      totalBookings,
      revenue,
      activeEvents,
      bookedSlotsCount,
      blockedSlotsCount
    };
  };

  return (
    <BookingContext.Provider value={{
      venues,
      bookings,
      slots,
      cateringPackages,
      decorThemes,
      avEquipment,
      adminSession,
      darkMode,
      toggleDarkMode,
      loginAdmin,
      logoutAdmin,
      addVenue,
      editVenue,
      deleteVenue,
      updateCateringPackage,
      updateDecorTheme,
      addBooking,
      cancelBooking,
      blockSlot,
      unblockSlot,
      getSlotStatus,
      getBookingStatistics
    }}>
      {children}
    </BookingContext.Provider>
  );
};
