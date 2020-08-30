import express from 'express';

import middlewares from './middlewares';
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

    const router = express.Router();
    router.get('/', reqhand.root);
    app.use(router);

    const apiRouter = express.Router();
    apiRouter.use(middlewares.api);
    apiRouter.get('', reqhand.api.root);
    apiRouter.get('/24h', reqhand.api.day.avg);
    apiRouter.get('/24h/current', reqhand.api.day.current);
    apiRouter.get('/24h/max', reqhand.api.day.max);
    apiRouter.get('/24h/min', reqhand.api.day.min);
    app.use('/api', apiRouter);

    return new Promise((resolve) => {
      app.listen(this._port, this._host, () => {
        console.log(`Running on http://${this._host}:${this._port} 🚀`);
        resolve();
      });
    });
  }
}

export default Server;
