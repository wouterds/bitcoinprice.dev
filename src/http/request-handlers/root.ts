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
  body += '    — a hyperfast realtime Bitcoin price API without rate limits\n';
  body += '\n';
  body += 'Formula:\n';
  body += `    (${Object.keys(data).join(' + ')}) / ${
    Object.keys(data).length
  }\n`;
  body += '\n';

  if (data) {
    body += 'Exchange prices:\n';
    for (const [exchange, value] of Object.entries(data)) {
      body += `    ${exchange}: $${value}\n`;
    }
    body += '\n';
  }

  body += 'API endpoints:\n';
  body += `    https://${process.env.API_HOST}\n`;
  body += '\n';

  if (price) {
    body += `1 BTC = ${price} USD`;
  }

  res.setHeader('content-type', 'text/plain');
  res.send(body);
};

export default root;
