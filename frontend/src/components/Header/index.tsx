import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../contexts/AppContext';

interface HeaderProps {
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  const { token, user } = useAppContext();
  return (
    <header className="flex h-[100px] px-10 bg-dark justify-between items-center">
      <h1 className="text-3xl text-white font-bold">
        Airelines Ticket Booking
      </h1>
      <nav className="flex">
        {user && (
          <div className="flex gap-4 mr-10">
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>isAdmin:</strong> {user.isAdmin + ''}
            </p>
          </div>
        )}
        {!token ? (
          <div className="flex gap-4">
            <Link to="/login" className="text-yellow">
              Login
            </Link>
            <Link to="/register" className="text-yellow">
              Register
            </Link>
          </div>
        ) : (
          <>
            <Link to="/dashboard" className="mr-4 text-green">
              Dashboard
            </Link>
            <button onClick={onLogout} className="text-pink">
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
};
