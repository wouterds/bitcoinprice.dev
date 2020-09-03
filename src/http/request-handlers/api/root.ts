import { Request, Response } from 'express';
import TickerRepository from 'repositories/ticker';
import Sources from 'tickers/sources';

const sources = Object.values(Sources);
const repository = new TickerRepository();

const root = async (_req: Request, res: Response): Promise<void> => {
  const price = await repository.getAveragePriceForSources(sources);

  res.setHeader('content-type', 'text/plain');
  res.send(price);
};

export default root;
