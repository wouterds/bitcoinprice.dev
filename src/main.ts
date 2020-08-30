import Server from 'http/server';

const server = new Server(parseInt(process.env.PORT as string) || 4000);

server.start();
