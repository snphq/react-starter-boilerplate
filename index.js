// Allows you to precompile ES6 syntax
require('@babel/register');

// Setup global variables for server-side
const isDev = process.env.NODE_ENV === 'development';

global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__INJECT_SERVER_RENDERING__ = !isDev;
global.__DEV__ = isDev;

// Run assets require hooks
require('./tools/webpack/hooks')();
// Run server
require('./src/server');
