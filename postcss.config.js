const customProperties = require('postcss-custom-properties');

module.exports = () => ({
  plugins: [
    customProperties(),
  ],
})