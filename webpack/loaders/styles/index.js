if (process.env.TARGET_ENV === 'node') {
  module.exports = require('./node');
} else {
  module.exports = require('./web');
}
