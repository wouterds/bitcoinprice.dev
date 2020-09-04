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

    const router = express.Router();
    router.get('/', requestHandlers.root);
    app.use(router);

    const apiRouter = express.Router();
    apiRouter.use(cors());
    apiRouter.use(middlewares.api);
    apiRouter.get('', requestHandlers.api.root);
    apiRouter.get('/24h/minutely', requestHandlers.api.day.minutely);
    app.use('/api', apiRouter);

    app.listen(this._port, () => {
      console.log(chalk.green(`Running on http://localhost:${this._port} 🚀`));
    });
  };
}

export default Server;
