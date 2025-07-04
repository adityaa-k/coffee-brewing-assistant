import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import LandingPage from './LandingPage.jsx';
import BrewerApp from './BrewerApp.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import BlogIndexPage from './blog/BlogIndexPage.jsx';
import BlogPostPage from './blog/BlogPostPage.jsx';
import { trackEvent } from './analytics.js';

// This component will listen for route changes and fire analytics events.
const AnalyticsTracker = () => {
    const location = useLocation();

    useEffect(() => {
        // Map pathname to a user-friendly view name
        let destination = 'landing';
        if (location.pathname.startsWith('/blog/')) {
            destination = 'blogPost';
        } else if (location.pathname === '/blog') {
            destination = 'blogIndex';
        } else if (location.pathname === '/app') {
            destination = 'app';
        }

        trackEvent('navigation', { 
            destination: destination,
            page_path: location.pathname 
        });

    }, [location.pathname]); // Fire event whenever the pathname changes

    return null; // This component does not render anything
};

function App() {
    const location = useLocation();
    const isLandingPage = location.pathname === '/';

    return (
        <div className="min-h-screen bg-brand-cream text-brand-brown font-sans flex flex-col">
            <Helmet>
                <title>Coffee Brewing Assistant | Your Guide to the Perfect Cup</title>
                <meta name="description" content="Welcome to the Coffee Brewing Assistant. Get adaptive recipes, step-by-step timers, and expert tips for brewing perfect coffee at home." />
            </Helmet>

            <AnalyticsTracker />
            
            {!isLandingPage && <Header />}
            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/app" element={<BrewerApp />} />
                    <Route path="/blog" element={<BlogIndexPage />} />
                    <Route path="/blog/:slug" element={<BlogPostPage />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;
