import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import LandingPage from './LandingPage.jsx';
import BrewerApp from './BrewerApp.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import BlogIndexPage from './blog/BlogIndexPage.jsx';
import BlogPostPage from './blog/BlogPostPage.jsx';

function App() {
    const location = useLocation();
    const isLandingPage = location.pathname === '/';

    return (
        <div className="min-h-screen bg-brand-cream text-brand-brown font-sans flex flex-col">
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
