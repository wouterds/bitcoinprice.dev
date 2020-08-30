import express from 'express';

import rhandlers from './request-handlers';

class Server {
  private _host: string;
  private _port: number;

  constructor(host: string, port: number) {
    this._host = host;
    this._port = port;
  }

  async start(): Promise<void> {
    const app = express();

    app.get('/', rhandlers.root);

    return new Promise((resolve) => {
      app.listen(this._port, this._host, () => {
        console.log(`Running on http://${this._host}:${this._port} 🚀`);
        resolve();
      });
    });
  }
}

export default Server;
