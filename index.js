// Allows you to precompile ES6 syntax
require('@babel/register');

// Setup global variables for server-side
global.__DEV__ = process.env.NODE_ENV === 'development';
global.__INJECT_HTML__ = process.env.HTML_INJECTION === 'inject';
global.__APP_ENV__ = process.env.APP_ENV;
global.__CLIENT__ = false;
global.__SERVER__ = true;

// Run assets require hooks
require('./tools/webpack/hooks')();
// Run server
require('./src/server');
