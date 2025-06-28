import React from 'react';
import { blogPosts } from './blogPosts';

const BlogIndexPage = ({ onPostSelect }) => {
  return (
    <div className="container mx-auto max-w-5xl p-4 space-y-12">
      <header className="text-center">
        <h1 className="text-5xl font-extrabold text-brand-brown tracking-tight">From the Journal</h1>
        <p className="text-brand-brown/80 mt-2 max-w-2xl mx-auto text-lg">
          A collection of thoughts, guides, and deep dives into the art and science of coffee.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        {blogPosts.map((post) => (
          <div 
            key={post.slug} 
            onClick={() => onPostSelect(post.slug)}
            className="group cursor-pointer bg-white/50 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <div className="overflow-hidden">
                <img src={post.featuredImage} alt={post.title} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="p-6">
              <p className="text-sm text-brand-brown/60 mb-1">{post.date}</p>
              <h2 className="text-2xl font-bold text-brand-brown mb-2 group-hover:text-brand-tan transition-colors">{post.title}</h2>
              <p className="text-brand-brown/80">{post.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogIndexPage;
