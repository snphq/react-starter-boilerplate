if (process.env.APP_ENV === 'production') {
  module.exports = require('./production');
} else {
  module.exports = require('./development');
}
