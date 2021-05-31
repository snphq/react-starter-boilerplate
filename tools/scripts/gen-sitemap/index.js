require('@babel/register');

require('../../hooks')();

require('./gen-sitemap').default();
