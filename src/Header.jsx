import React from 'react';

const Header = ({ onNavigate, activeView }) => {
  return (
    <header className="container mx-auto max-w-5xl p-4 flex justify-between items-center">
      <button onClick={() => onNavigate('landing')} className="text-2xl font-extrabold text-brand-brown tracking-tight hover:text-brand-tan transition-colors">
        Coffee Brewing Assistant
      </button>
      <nav className="flex space-x-6">
        <button 
          onClick={() => onNavigate('app')} 
          className={`font-semibold transition-colors ${activeView === 'app' ? 'text-brand-brown' : 'text-brand-brown/60 hover:text-brand-brown'}`}>
          App
        </button>
        <button 
          onClick={() => onNavigate('blogIndex')} 
          className={`font-semibold transition-colors ${activeView === 'blogIndex' || activeView === 'blogPost' ? 'text-brand-brown' : 'text-brand-brown/60 hover:text-brand-brown'}`}>
          Blog
        </button>
      </nav>
    </header>
  );
};

export default Header;
