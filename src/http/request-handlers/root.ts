import { Request, Response } from 'express';
import TickerRepository from 'repositories/ticker';
import Sources from 'tickers/sources';

const sources = Object.values(Sources);
const repository = new TickerRepository();

const root = async (_req: Request, res: Response): Promise<void> => {
  const startTime = new Date().getTime();
  const price = await repository.getAveragePriceForSources(sources);

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
  body +=
    '------------------------------------------------------------------------\n';
  body += '\n';
  body += 'Formula:\n';
  body += `    (${sources.join(' + ')}) / ${sources.length}\n`;
  body += '\n';

  body += 'Exchange prices:\n';
  for (const source of sources) {
    const exchangePrice = await repository.getPriceForSource(source);
    if (!exchangePrice) {
      continue;
    }

    body += `    ${source}: $${exchangePrice}\n`;
  }
  body += '\n';

  body += 'API endpoints:\n';
  body += `    https://${process.env.API_HOST}\n`;
  body += `    https://${process.env.API_HOST}/24h/minutely\n`;
  body += '\n';

  if (price) {
    body +=
      '------------------------------------------------------------------------\n';
    body += '\n';
    body += `1 BTC = ${price} USD\n`;
    body += '\n';
  }

  const passedTime = new Date().getTime() - startTime;

  body +=
    '------------------------------------------------------------------------\n';
  body += '\n';
  body += `page generated in ${passedTime}ms`;

  res.setHeader('content-type', 'text/plain');
  res.send(body);
};

export default root;
