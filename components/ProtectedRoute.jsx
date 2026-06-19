import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { BookingContext } from '../context/BookingContext';

export default function ProtectedRoute({ children }) {
  const { adminSession } = useContext(BookingContext);

  if (!adminSession.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
