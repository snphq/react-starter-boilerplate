if (__APP_ENV__ === 'staging') {
  /* including staging config */
  module.exports = require('./staging');
} else if (__APP_ENV__ === 'production') {
  /* including production config */
  module.exports = require('./production');
} else {
  /* including default (development) config */
  module.exports = require('./default');
}
