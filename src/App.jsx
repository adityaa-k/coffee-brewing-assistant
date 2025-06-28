import React, { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import LandingPage from './LandingPage.jsx';
import BrewerApp from './BrewerApp.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import BlogIndexPage from './blog/BlogIndexPage.jsx';
import BlogPostPage from './blog/BlogPostPage.jsx';

// Simple helper for analytics
const trackEvent = (eventName, data) => {
    if (typeof window.dataLayer !== 'undefined') {
        window.dataLayer.push({
            event: eventName,
            ...data,
        });
    }
};

function App() {
    const [view, setView] = useState('landing'); // 'landing', 'app', 'blogIndex', 'blogPost'
    const [currentPostSlug, setCurrentPostSlug] = useState(null);

    const handleNavigate = (newView, slug = null) => {
        trackEvent('navigation', { destination: newView });
        setView(newView);
        setCurrentPostSlug(slug);
        if (typeof window !== 'undefined') {
            window.scrollTo(0, 0);
        }
    };

    let content;
    let pageTitle = "Coffee Brewing Assistant | Your Guide to the Perfect Cup";
    let pageDescription = "The Coffee Brewing Assistant is your friendly, AI-powered guide to the perfect cup. Get adaptive recipes, step-by-step timers, and expert tips for brewing coffee at home.";
    let showHeaderFooter = view !== 'landing';

    switch (view) {
        case 'app':
            content = <BrewerApp />;
            pageTitle = "Brewer App | Coffee Brewing Assistant";
            pageDescription = "Use our interactive brewing assistant to make the perfect Iced V60 coffee with adaptive timers and recipes.";
            break;
        case 'blogIndex':
            content = <BlogIndexPage onPostSelect={(slug) => handleNavigate('blogPost', slug)} />;
            pageTitle = "Blog | Coffee Brewing Assistant";
            pageDescription = "A collection of thoughts, guides, and deep dives into the art and science of coffee from the CBA team.";
            break;
        case 'blogPost':
            content = <BlogPostPage slug={currentPostSlug} />;
            // Title and description for blog posts are handled within the BlogPostPage component itself
            break;
        default:
            content = <LandingPage onEnterApp={() => handleNavigate('app')} onNavigate={handleNavigate} />;
            showHeaderFooter = false;
    }

    return (
        <div className="min-h-screen bg-brand-cream text-brand-brown font-sans">
            <Helmet>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
            </Helmet>
            
            {showHeaderFooter && <Header onNavigate={handleNavigate} activeView={view} />}
            <main>
                {content}
            </main>
            {showHeaderFooter && <Footer onNavigate={handleNavigate} />}
        </div>
    );
}

export default App;
