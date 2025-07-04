import React from 'react';
import { Link } from 'react-router-dom';
import Seo from './Seo';
import content from './landingPageContent.json';

// --- SVG Icons for Landing Page ---
const Zap = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
);
const Timer = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);
const SlidersHorizontal = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="21" y1="4" x2="14" y2="4" /><line x1="10" y1="4" x2="3" y2="4" /><line x1="21" y1="12" x2="12" y2="12" /><line x1="8" y1="12" x2="3" y2="12" /><line x1="21" y1="20" x2="16" y2="20" /><line x1="12" y1="20" x2="3" y2="20" /><line x1="14" y1="2" x2="14" y2="6" /><line x1="8" y1="10" x2="8" y2="14" /><line x1="16" y1="18" x2="16" y2="22" />
  </svg>
);

const featureIcons = {
    Zap,
    Timer,
    SlidersHorizontal,
};

const LandingPage = () => {
  return (
    <>
      <Seo
        title="Coffee Brewing Assistant | Your Guide to the Perfect Cup"
        description="Welcome to the Coffee Brewing Assistant. Get adaptive recipes, step-by-step timers, and expert tips for brewing perfect coffee at home."
        canonicalUrl="https://coffeebrewingassistant.com/"
        imageUrl="https://coffeebrewingassistant.com/og-image.png" // Replace with your main social sharing image URL
      />
      <div className="container mx-auto max-w-5xl p-4">
        <header className="flex justify-between items-center py-6">
            <h1 className="text-2xl font-extrabold text-brand-brown tracking-tight">
            Coffee Brewing Assistant
            </h1>
            <nav className="flex space-x-6">
            <Link to="/app" className="font-semibold text-brand-brown/60 hover:text-brand-brown transition-colors">App</Link>
            <Link to="/blog" className="font-semibold text-brand-brown/60 hover:text-brand-brown transition-colors">Blog</Link>
            </nav>
        </header>
        
        <main>
            <section className="text-center py-12 md:py-20">
            <h2 className="text-5xl md:text-6xl font-extrabold text-brand-brown tracking-tight">{content.hero.headline}</h2>
            <p className="text-brand-brown/80 mt-4 max-w-2xl mx-auto text-lg">{content.hero.subheadline}</p>
            <Link 
                to="/app"
                className="mt-8 inline-block px-12 py-4 bg-brand-tan text-brand-brown font-bold text-lg rounded-xl shadow-lg hover:shadow-xl hover:bg-brand-tan/90 transition-all duration-300 transform hover:-translate-y-1">
                {content.hero.ctaButton}
            </Link>
            </section>

            <section className="py-16">
            <div className="grid md:grid-cols-3 gap-8">
                {content.features.map((feature, index) => {
                const Icon = featureIcons[feature.icon];
                return (
                    <div key={index} className="bg-white/40 backdrop-blur-sm p-8 rounded-2xl shadow-md text-center">
                    <div className="w-16 h-16 mx-auto bg-brand-tan/50 rounded-full flex items-center justify-center mb-4">
                        <Icon className="w-8 h-8 text-brand-brown" />
                    </div>
                    <h3 className="text-2xl font-bold text-brand-brown mb-2">{feature.title}</h3>
                    <p className="text-brand-brown/80">{feature.description}</p>
                    </div>
                );
                })}
            </div>
            </section>

            <section className="py-16">
            <div className="text-center max-w-3xl mx-auto">
                <p className="text-3xl font-light italic text-brand-brown">"{content.testimonial.quote}"</p>
                <p className="mt-4 font-bold text-brand-brown/80">— {content.testimonial.author}</p>
            </div>
            </section>

            <section className="py-16">
            <div className="bg-white/40 backdrop-blur-sm p-12 rounded-2xl shadow-lg text-center">
                <h2 className="text-4xl font-extrabold text-brand-brown">{content.finalCta.headline}</h2>
                <Link
                to="/app"
                className="mt-8 inline-block px-12 py-4 bg-brand-tan text-brand-brown font-bold text-lg rounded-xl shadow-lg hover:shadow-xl hover:bg-brand-tan/90 transition-all duration-300 transform hover:-translate-y-1">
                {content.finalCta.ctaButton}
                </Link>
            </div>
            </section>
        </main>
      </div>
    </>
  );
};

export default LandingPage;
