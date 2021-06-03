// const normalize = require('gatsby-source-wordpress/normalize')
// const normalizers = require('gatsby-source-wordpress-updater').normalizers(normalize)

const path = require('path')

const map = (xs, f) => xs.map(f)
const each = (xs, f) => xs.forEach(f)

module.exports = {
  siteMetadata: {
    title: 'The Learning People',
    domain: 'learningpeople.com',
    protocol: 'https',
    url: 'https://www.learningpeople.com',
    siteUrl: 'https://www.learningpeople.com' // for gatsby-plugin-sitemap
  },

  pathPrefix: '/public',

  plugins: [
    // gatsby-source-filesystem
    // gatsby-plugin-create-client-paths
    // gatsby-plugin-preact
    // gatsby-plugin-google-tagmanager
    // gatsby-plugin-nprogress
    // gatsby-plugin-robots-txt
    // gatsby-plugin-purgecss
    // gatsby-plugin-webpack-size
    // gatsby-plugin-settings
    // gatsby-i18n
    // gatsby-plugin-resolve-src

    // 'gatsby-plugin-page-transitions',
    // 'gatsby-plugin-netlify-cache',
    // 'gatsby-plugin-extract-schema',

    'gatsby-plugin-core-js',
    'gatsby-plugin-catch-links',
    'gatsby-image',
    'gatsby-plugin-sharp',
    'gatsby-plugin-react-svg',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-lodash',
    'gatsby-plugin-force-trailing-slashes',
    'gatsby-plugin-postcss',

    ...(process.env.ANALYZE
      ? [
          {
            resolve: 'gatsby-plugin-webpack-bundle-analyzer',
            options: {
              production: true
            }
          }
        ]
      : []),

    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        exclude: ['/*/all-the-things', '/please-no-link', '/*/error']
      }
    },

    {
      resolve: 'gatsby-source-wordpress',
      options: {
        // normalizer,
        // baseUrl: 'learningpeople.inno:8888',
        // baseUrl: 'learningpeople.localhost:8080',
        // protocol: 'http',
        baseUrl: 'admin.learningpeople.com',
        protocol: 'https',
        // verboseOutput: true,
        hostingWPCOM: false,
        useACF: true,
        acfOptionPageIds: [],
        perPage: 100,
        concurrentRequests: 1,
        includedRoutes: [
          '/inno/v1/things',
          '/wp-api-menus/v2/menus',
          '/wp/v2/media'
        ],
        excludedRoutes: [
          '/wp/v2/users/me',
          '/acf/v2/options',
          '/acf/v3/*',
          '/wp/v2/settings',
          '/wpml/tm/v1/ate/jobs/store',
          '/wpml/tm/v1/ams/register_manager',
          '/wpml/tm/v1/ams/synchronize/translators',
          '/wpml/tm/v1/ams/synchronize/managers',
          '/wpml/tm/v1/ams/status',
          '/wpml/tm/v1/ate/jobs',
          '/wpml/tm/v1/jobs/assign',
          '/wpml/tm/v1/settings/translation_editor'
        ]
        // normalizers: normalizers({
        //   // url: 'wss://gatsby-socket.services.inno.nl/ws',
        //   // token: 'fjXxJ26mKbYsocket.services.inno.nl/ws',
        //   url: 'ws://localhost:4000/ws',
        //   token: 'devsocket',
        //   channel: 'learningpeople'
        // })
      }
    },

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, 'src', 'static', 'img')
      }
    },

    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        policy: [
          {
            userAgent: '*',
            allow: '/'
          }
        ]
      }
    },

    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Learning People',
        short_name: 'LP',
        start_url: '/',
        background_color: '#2A2D58',
        theme_color: '#2A2D58',
        display: 'browser',
        icon: 'src/static/img/favicon.jpg',
        include_favicon: true
      }
    },

    // must be below gatsby-plugin-manifest
    ...[
      process.env.NO_SERVICE_WORKER
        ? {
            resolve: 'gatsby-plugin-remove-serviceworker'
          }
        : {
            resolve: 'gatsby-plugin-offline',
            options: {
              importWorkboxFrom: 'local'
            }
          }
    ]
  ]
}
