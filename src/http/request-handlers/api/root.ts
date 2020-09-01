import { Request, Response } from 'express';
import redis from 'services/redis';

const root = async (_req: Request, res: Response): Promise<void> => {
  const data = await redis.hgetall('ticker');

  const values = Object.values(data);
  const price = (
    values.reduce(
      (total: number, value: string) => total + parseFloat(value),
      0,
    ) / values.length
  ).toFixed(2);

  res.setHeader('content-type', 'text/plain');
  res.send(price);
};

export default root;
