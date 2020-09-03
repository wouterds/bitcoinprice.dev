import { Request, Response } from 'express';
import TickerRepository from 'repositories/ticker';

const repository = new TickerRepository();

const root = async (_req: Request, res: Response): Promise<void> => {
  const averages = await repository.getMinutelyAverages();
  const values = Object.entries(averages)
    .sort((a, b) => (a[0] > b[0] ? 1 : -1))
    .map((item) => item[1]);

  res.setHeader('content-type', 'text/plain');
  res.send(values.join('\n'));
};

export default root;
