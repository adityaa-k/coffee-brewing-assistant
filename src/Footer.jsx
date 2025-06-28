import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="container mx-auto max-w-5xl p-4 text-center py-12 mt-16 border-t border-brand-brown/10 text-brand-brown/80">
      <div className="space-x-6 mb-4">
        <Link to="/app" className="font-semibold hover:text-brand-brown transition-colors">App</Link>
        <Link to="/blog" className="font-semibold hover:text-brand-brown transition-colors">Blog</Link>
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
