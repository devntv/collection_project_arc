import fs from 'fs';
import { DOMAIN_TS } from 'sysconfig';

const Sitemap = () => {};

export const getServerSideProps = ({ res }) => {
  const baseUrl = DOMAIN_TS;
  const staticPages = fs
    .readdirSync(
      {
        // development: 'src/pages',
        development: './.next/server/pages',
        // for standalone
        production: './.next/server/pages',
        prd: './.next/server/pages',
        dev: './.next/server/pages',
        stg: './.next/server/pages',
        uat: './.next/server/pages',
      }[process.env.NODE_ENV],
    )
    .filter(
      (staticPage) =>
        ![
          '_app.js',
          '_document.js',
          '_error.js',
          'sitemap.xml.js',
          'testing.js',
          'api',
          'app',
          'middleware',
          'DS_Store',
          'index.js',
          'landingpage',
          'maintain',
          '.DS_Store',
          '_middleware.ts',
          'app.js',
          'testing',
          'thankyou',
          '.',
          'supplier',
          'user',
        ].includes(staticPage) && staticPage.indexOf('.') === -1,
    )
    .map((staticPagePath) => `${baseUrl}/${staticPagePath}`);

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
          ${staticPages
            .map(
              (url) => `
                <url>
                  <loc>${url}</loc>
                  <lastmod>${new Date().toISOString()}</lastmod>
                  <changefreq>monthly</changefreq>
                  <priority>1.0</priority>
                </url>
              `,
            )
            .join('')}
        </urlset>
      `;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
