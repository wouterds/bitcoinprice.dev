import Server from 'application/http/server';

const server = new Server(
  `${process.env.HOST}`,
  parseInt(`${process.env.PORT}`),
);

server.start();
