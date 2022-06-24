const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  experimental: {
    newNextLinkBehavior: true,
  }
}

module.exports = withPWA({
  ...config,
  pwa: {
    dest: 'public',
    runtimeCaching,
  },
})
