import express from 'express';

import reqhand from './request-handlers';

class Server {
  private _host: string;
  private _port: number;

  constructor(host: string, port: number) {
    this._host = host;
    this._port = port;
  }

  async start(): Promise<void> {
    const app = express();

    app.get('/', reqhand.root);
    app.get('/api', reqhand.api.root);
    app.get('/api/24h', reqhand.api.day.avg);
    app.get('/api/24h/current', reqhand.api.day.current);
    app.get('/api/24h/max', reqhand.api.day.max);
    app.get('/api/24h/min', reqhand.api.day.min);

    return new Promise((resolve) => {
      app.listen(this._port, this._host, () => {
        console.log(`Running on http://${this._host}:${this._port} 🚀`);
        resolve();
      });
    });
  }
}

export default Server;
