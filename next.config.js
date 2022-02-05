/** @type {import('next').NextConfig} */
module.exports = {
  trailingSlash: true,
  assetPrefix: process.env.BASE_PATH || '',
  basePath: process.env.BASE_PATH || '',
}
