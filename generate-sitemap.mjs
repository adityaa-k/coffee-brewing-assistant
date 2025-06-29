import fs from 'fs';
import { blogPosts } from './src/blog/blogPosts.js';

const generateSitemap = async () => {
  const baseUrl = 'https://coffeebrewingassistant.com';
  const today = new Date().toISOString().split('T')[0];

  // Static pages
  const staticPages = [
    { url: '/', changefreq: 'weekly', priority: '1.0' },
    { url: '/app', changefreq: 'monthly', priority: '0.8' },
    { url: '/blog', changefreq: 'weekly', priority: '0.9' },
  ];

  // Dynamic blog post pages
  const blogPostPages = blogPosts.map(post => ({
    url: `/blog/${post.slug}`,
    changefreq: 'yearly',
    priority: '0.7',
    lastmod: new Date(post.date).toISOString().split('T')[0] // Use post date for lastmod
  }));

  const allPages = [...staticPages, ...blogPostPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPages
    .map(page => {
      const lastmod = page.lastmod ? `<lastmod>${page.lastmod}</lastmod>` : `<lastmod>${today}</lastmod>`;
      return `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    ${lastmod}
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
    })
    .join('')}
</urlset>`;

  fs.writeFileSync('public/sitemap.xml', sitemap);
  console.log('sitemap.xml generated successfully!');
};

generateSitemap();