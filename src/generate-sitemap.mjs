import fs from 'fs';
import { blogPosts } from './src/blog/blogPosts.js';

const baseUrl = 'https://coffeebrewingassistant.com';
const today = new Date().toISOString().split('T')[0];

const createApiKeyFile = () => {
  const apiKey = process.env.INDEXNOW_API_KEY;

  if (!apiKey) {
    console.log('IndexNow API key not found in environment variables. Skipping key file creation.');
    return;
  }

  // Ensure the public directory exists
  if (!fs.existsSync('public')) {
    fs.mkdirSync('public');
  }

  // Create the key file in the /public directory. 
  // The file name is the key itself, and the content is also the key.
  fs.writeFileSync(`public/${apiKey}.txt`, apiKey);
  console.log(`IndexNow API key file created at public/${apiKey}.txt`);
};

const generateSitemap = () => {
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
    lastmod: new Date(post.date).toISOString().split('T')[0]
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
  
  // Return the list of all URLs for IndexNow
  return allPages.map(page => `${baseUrl}${page.url}`);
};

const pingIndexNow = async (urlList) => {
  const apiKey = process.env.INDEXNOW_API_KEY;

  if (!apiKey) {
    console.log('IndexNow API key not found. Skipping ping.');
    return;
  }

  const payload = {
    host: "coffeebrewingassistant.com",
    key: apiKey,
    keyLocation: `https://coffeebrewingassistant.com/${apiKey}.txt`,
    urlList: urlList
  };

  try {
    console.log('Pinging IndexNow API...');
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      console.log(`IndexNow ping successful! Status: ${response.status}`);
    } else {
      console.error(`IndexNow ping failed! Status: ${response.status}`);
      const errorText = await response.text();
      console.error('Error details:', errorText);
    }
  } catch (error) {
    console.error('Error submitting to IndexNow:', error);
  }
};


// Main execution
(async () => {
  createApiKeyFile(); // Create the key file first
  const allUrls = generateSitemap();
  await pingIndexNow(allUrls);
})();
