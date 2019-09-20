/* Allows you to precompile ES6 syntax */
require('@babel/register');

/* Run assets require hooks */
require('./tools/hooks')();

/* Define global variables */
global.RUNTIME_ENV = 'server';

/* Run server */
require('./src/server');
