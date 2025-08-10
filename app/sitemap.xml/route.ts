export async function GET() {
  const baseUrl = 'https://moriverguide.com';
  
  const staticPages = [
    { url: '', priority: '1.0', changefreq: 'daily' },
    { url: '/rivers', priority: '0.9', changefreq: 'weekly' },
    { url: '/trip-planner', priority: '0.9', changefreq: 'weekly' },
    { url: '/map', priority: '0.8', changefreq: 'weekly' },
    { url: '/outfitters', priority: '0.8', changefreq: 'weekly' },
    { url: '/access-points', priority: '0.8', changefreq: 'weekly' },
    { url: '/water-levels', priority: '0.9', changefreq: 'hourly' },
    { url: '/safety', priority: '0.7', changefreq: 'monthly' },
    { url: '/diy-guide', priority: '0.7', changefreq: 'monthly' },
  ];

  const rivers = [
    'current-river', 'jacks-fork-river', 'meramec-river', 'niangua-river',
    'eleven-point-river', 'gasconade-river', 'big-piney-river', 'black-river',
    'huzzah-creek', 'courtois-creek', 'north-fork-river', 'james-river', 'elk-river'
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages.map(page => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('')}
  ${rivers.map(river => `
  <url>
    <loc>${baseUrl}/rivers/${river}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}
  ${rivers.slice(0, 8).map(river => `
  <url>
    <loc>${baseUrl}/water-levels/${river}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>hourly</changefreq>
    <priority>0.9</priority>
  </url>`).join('')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    }
  });
}