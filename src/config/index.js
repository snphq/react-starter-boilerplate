if (process.env.APP_ENV === 'staging') {
  module.exports = require('./staging');
} else if (process.env.APP_ENV === 'production') {
  module.exports = require('./production');
} else {
  module.exports = require('./default');
}
