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

  let body = '';
  body +=
    '   _     _ _            _                  _               _            \n';
  body +=
    '  | |   (_) |          (_)                (_)             | |           \n';
  body +=
    '  | |__  _| |_ ___ ___  _ _ __  _ __  _ __ _  ___ ___   __| | _____   __\n';
  body +=
    "  | '_ \\| | __/ __/ _ \\| | '_ \\| '_ \\| '__| |/ __/ _ \\ / _` |/ _ \\ \\ / /\n";
  body +=
    '  | |_) | | || (_| (_) | | | | | |_) | |  | | (_|  __/| (_| |  __/\\ V / \n';
  body +=
    '  |_.__/|_|\\__\\___\\___/|_|_| |_| .__/|_|  |_|\\___\\___(_)__,_|\\___| \\_/  \n';
  body +=
    '                               | |                                      \n';
  body +=
    '                               |_|                                      \n';
  body += '\n';
  body += 'Formula:\n';
  body += '    (kraken + coinbase pro + binance) / 3\n';
  body += '\n';

  if (data) {
    body += 'Exchange prices:\n';
    for (const [exchange, value] of Object.entries(data)) {
      body += `    ${exchange}: $${value}\n`;
    }
    body += '\n';
  }

  if (price) {
    body += `1 BTC = ${price} USD`;
  }

  res.setHeader('content-type', 'text/plain');
  res.send(body);
};

export default root;
