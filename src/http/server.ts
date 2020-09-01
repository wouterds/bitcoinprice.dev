import chalk from 'chalk';
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
    apiRouter.use(middlewares.api);
    apiRouter.get('', requestHandlers.api.root);
    app.use('/api', apiRouter);

    app.listen(this._port, () => {
      console.log(chalk.green(`Running on http://localhost:${this._port} 🚀`));
    });
  };
}

export default Server;
