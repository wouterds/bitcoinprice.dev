import { Request, Response } from 'express';
import TickerRepository from 'repositories/ticker';
import Sources from 'tickers/sources';

const sources = Object.values(Sources);
const repository = new TickerRepository();

const root = async (req: Request, res: Response): Promise<void> => {
  const source = req.params.source as Sources;
  if (!sources.includes(source)) {
    res.sendStatus(404);
    return;
  }

  const price = await repository.getPriceForSource(source);

  res.setHeader('content-type', 'text/plain');
  res.send(price);
};

export default root;
