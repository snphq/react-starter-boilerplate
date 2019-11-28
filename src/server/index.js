import server from './server';

global.RUNTIME_ENV = 'server';

server(process.env.PORT);
