if (
  process.env.APP_ENV === 'production' ||
  process.env.NODE_ENV === 'analyze'
) {
  module.exports = require('./production');
} else {
  module.exports = require('./development');
}
