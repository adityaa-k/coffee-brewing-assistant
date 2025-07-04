import React from 'react';
import { Helmet } from 'react-helmet-async';

const Seo = ({
  title,
  description,
  canonicalUrl,
  imageUrl,
  type = 'website', // 'website' or 'article'
  publishedDate,
  modifiedDate,
  schema,
}) => {
  const siteName = "Coffee Brewing Assistant";
  const twitterHandle = "@YourTwitterHandle"; // Replace with your actual Twitter handle

  const fullTitle = type === 'article' ? `${title} | ${siteName}` : title;
  const today = new Date().toISOString();

  return (
    <Helmet>
      {/* Standard SEO */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

      {/* Published and Modified Dates */}
      {publishedDate && <meta property="article:published_time" content={publishedDate} />}
      {modifiedDate && <meta property="article:modified_time" content={modifiedDate} />}

      {/* Open Graph (for Facebook, LinkedIn, etc.) */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      
      {/* X (Twitter) Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Hreflang Tags */}
      <link rel="alternate" href={canonicalUrl} hrefLang="en" />
      <link rel="alternate" href={canonicalUrl} hrefLang="x-default" />

      {/* JSON-LD Schema Markup */}
      {schema && <script type="application/ld+json">{JSON.stringify(schema)}</script>}
    </Helmet>
  );
};

export default Seo;
