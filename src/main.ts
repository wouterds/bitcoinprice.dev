import Server from 'application/http/server';

const server = new Server(parseInt(process.env.PORT as string));

server.start();
