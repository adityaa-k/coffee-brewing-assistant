import React from 'react';

const Footer = ({ onNavigate }) => {
  return (
    <footer className="container mx-auto max-w-5xl p-4 text-center py-12 mt-16 border-t border-brand-brown/10 text-brand-brown/80">
      <div className="space-x-6 mb-4">
        <button onClick={() => onNavigate('app')} className="font-semibold hover:text-brand-brown transition-colors">App</button>
        <button onClick={() => onNavigate('blogIndex')} className="font-semibold hover:text-brand-brown transition-colors">Blog</button>
      </div>
      <p className="text-sm text-brand-brown/60">
        &copy; {new Date().getFullYear()} Coffee Brewing Assistant. All Rights Reserved.
      </p>
      <p className="text-xs text-brand-brown/50 mt-2">
        Disclaimer: All advice and recipes are intended as guidance. Your results may vary based on beans, equipment, and personal taste. Brew responsibly.
      </p>
    </footer>
  );
};

export default Footer;
