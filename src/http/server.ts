import express from 'express';

import middlewares from './middlewares';
import requestHandlers from './request-handlers';

class Server {
  private _port: number;

  constructor(port: number) {
    this._port = port;
  }

  async start(): Promise<void> {
    const app = express();

    const router = express.Router();
    router.get('/', requestHandlers.root);
    app.use(router);

    const apiRouter = express.Router();
    apiRouter.use(middlewares.api);
    apiRouter.get('', requestHandlers.api.root);
    apiRouter.get('/24h/avg', requestHandlers.api.day.avg);
    apiRouter.get('/24h/max', requestHandlers.api.day.max);
    apiRouter.get('/24h/min', requestHandlers.api.day.min);
    app.use('/api', apiRouter);

    return new Promise((resolve) => {
      app.listen(this._port, () => {
        console.log(`Running on http://localhost:${this._port} 🚀`);
        resolve();
      });
    });
  }
}

export default Server;
