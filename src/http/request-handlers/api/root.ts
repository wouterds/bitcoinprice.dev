import { Request, Response } from 'express';
import redis from 'redis';
import { promisify } from 'util';

const redisClient = redis.createClient({ host: 'redis' });
const getAsync = promisify(redisClient.hgetall).bind(redisClient);

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
