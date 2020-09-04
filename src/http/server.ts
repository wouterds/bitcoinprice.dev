import chalk from 'chalk';
import cors from 'cors';
import express from 'express';

import middlewares from './middlewares';
import requestHandlers from './request-handlers';

class Server {
  private _port: number;

  constructor(port: number) {
    this._port = port;
  }

  start = (): void => {
    const app = express();

    // middlewares
    app.use(cors());

    // regular routes
    const router = express.Router();
    router.get('/', requestHandlers.root);
    app.use(router);

    // api routes
    const apiRouter = express.Router();
    apiRouter.use(middlewares.api);
    apiRouter.get('', requestHandlers.api.root);
    apiRouter.get('/:source', requestHandlers.api.source);
    apiRouter.get('/24h/minutely', requestHandlers.api.day.minutely);
    app.use('/api', apiRouter);

    // start server
    app.listen(this._port, () => {
      console.log(chalk.green(`Running on http://localhost:${this._port} 🚀`));
    });
  };
}

export default Server;
