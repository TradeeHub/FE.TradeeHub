/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['d29n3hw9qp9q1.cloudfront.net'],
  },
};

const withNextIntl = require('next-intl/plugin')('./i18n.ts');
 
module.exports = withNextIntl(nextConfig);

/*module.exports = nextConfig*/
