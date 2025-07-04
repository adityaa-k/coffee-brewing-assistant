import fs from 'fs';
import { blogPosts } from './src/blog/blogPosts.js';

const baseUrl = 'https://coffeebrewingassistant.com';

const createApiKeyFile = () => {
  const apiKey = process.env.INDEXNOW_API_KEY;

  if (!apiKey) {
    console.log('IndexNow API key not found in environment variables. Skipping key file creation.');
    return;
  }

  if (!fs.existsSync('public')) {
    fs.mkdirSync('public');
  }

  fs.writeFileSync(`public/${apiKey}.txt`, apiKey);
  console.log(`IndexNow API key file created at public/${apiKey}.txt`);
};

const generateSitemap = () => {
  const today = new Date().toISOString().split('T')[0];

  // Static pages
  const staticPages = [
    { url: '/', lastmod: today },
    { url: '/app', lastmod: '2025-07-01' }, // Update this date when you make major app changes
    { url: '/blog', lastmod: today },
  ];

  // Dynamic blog post pages
  const blogPostPages = blogPosts.map(post => ({
    url: `/blog/${post.slug}`,
    lastmod: new Date(post.date).toISOString().split('T')[0]
  }));

  const allPages = [...staticPages, ...blogPostPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPages
    .map(page => {
      return `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
  </url>`;
    })
    .join('')}
</urlset>`;

  fs.writeFileSync('public/sitemap.xml', sitemap);
  console.log('sitemap.xml generated successfully!');
  
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
    console.log('Pinging IndexNow API with all URLs...');
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

// Main execution block
(async () => {
  createApiKeyFile();
  const allUrls = generateSitemap();
  await pingIndexNow(allUrls);
})();
