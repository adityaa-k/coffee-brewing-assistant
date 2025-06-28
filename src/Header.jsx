import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="container mx-auto max-w-5xl p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-extrabold text-brand-brown tracking-tight hover:text-brand-tan transition-colors">
        Coffee Brewing Assistant
      </Link>
      <nav className="flex space-x-6">
        <NavLink 
          to="/app" 
          className={({ isActive }) => `font-semibold transition-colors ${isActive ? 'text-brand-brown' : 'text-brand-brown/60 hover:text-brand-brown'}`}>
          App
        </NavLink>
        <NavLink 
          to="/blog" 
          className={({ isActive }) => `font-semibold transition-colors ${isActive ? 'text-brand-brown' : 'text-brand-brown/60 hover:text-brand-brown'}`}>
          Blog
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
