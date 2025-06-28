import React from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { blogPosts } from './blogPosts.js';

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
        <div className="text-center py-20 container mx-auto max-w-5xl p-4">
            <Helmet><title>Post Not Found | CBA</title></Helmet>
            <h1 className="text-4xl font-bold">Post Not Found</h1>
            <p className="mt-4 text-brand-brown/80">Sorry, we couldn't find the article you were looking for.</p>
        </div>
    );
  }
  
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
      <Helmet>
        <title>{`${post.title} | CBA Blog`}</title>
        <meta name="description" content={post.description} />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
      
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
        
      </article>
    </>
  );
};

export default BlogPostPage;
