import React from 'react';
import { useParams } from 'react-router-dom';
import Seo from '../Seo';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { blogPosts } from './blogPosts.js';

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
        <div className="text-center py-20 container mx-auto max-w-5xl p-4">
            <Seo title="Post Not Found | CBA" description="Sorry, we couldn't find the article you were looking for." />
            <h1 className="text-4xl font-bold">Post Not Found</h1>
            <p className="mt-4 text-brand-brown/80">Sorry, we couldn't find the article you were looking for.</p>
        </div>
    );
  }

  const canonicalUrl = `https://coffeebrewingassistant.com/blog/${post.slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "author": { "@type": "Organization", "name": "Coffee Brewing Assistant" },
    "datePublished": new Date(post.date).toISOString(),
    "image": post.featuredImage,
    "description": post.description,
    "articleBody": post.content
  };

  return (
    <>
      <Seo
        title={post.title}
        description={post.description}
        canonicalUrl={canonicalUrl}
        imageUrl={post.featuredImage}
        type="article"
        publishedDate={new Date(post.date).toISOString()}
        schema={schema}
      />
      <article className="container mx-auto max-w-3xl p-4">
        <header className="text-center mb-12">
          <p className="text-base text-brand-brown/80 mb-2">{post.date}</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-brand-brown tracking-tight">{post.title}</h1>
          <p className="mt-4 text-xl text-brand-brown/80">{post.author}</p>
        </header>
        
        <div className="overflow-hidden rounded-2xl shadow-lg mb-12">
          <img src={post.featuredImage} alt={post.title} className="w-full h-auto" />
        </div>

        <div className="prose lg:prose-xl max-w-none text-brand-brown/90 leading-relaxed">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>
        
        <div className="my-16">
          <h3 className="text-3xl font-bold text-brand-brown mb-4 text-center">Watch: The Iced Pour-Over Technique</h3>
          <div className="aspect-video rounded-2xl overflow-hidden shadow-lg bg-black">
            <iframe 
              src="https://www.youtube.com/embed/PApBycDrPo0" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      </article>
    </>
  );
};

export default BlogPostPage;
