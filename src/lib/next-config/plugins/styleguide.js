/**
 * @param {import('next').NextConfig} nextConfig
 */
const styleguidePlugin = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    i18n: !process.env.EXPORT_MODE && {
      ...nextConfig.i18n,
      locales: ['en'],
    },
  });
};

module.exports = styleguidePlugin;
