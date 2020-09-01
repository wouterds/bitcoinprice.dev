import { Request, Response } from 'express';
import redis from 'services/redis';
import { promisify } from 'util';

const getAsync = promisify(redis.hgetall).bind(redis);

const root = async (_req: Request, res: Response): Promise<void> => {
  const data = await getAsync('ticker');

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
