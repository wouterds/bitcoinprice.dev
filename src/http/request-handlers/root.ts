import { Request, Response } from 'express';
import TickerRepository from 'repositories/ticker';
import Sources from 'tickers/sources';

const sources = Object.values(Sources);
const repository = new TickerRepository();

const root = async (_req: Request, res: Response): Promise<void> => {
  const startTime = new Date().getTime();
  const price = await repository.getAveragePriceForSources(sources);

  let body = '<!DOCTYPE html><html lang=en><head><meta charset=UTF-8>';
  body += `<title>1 BTC = ${price} USD</title>`;
  body += '</head><body>';
  body += '<script>';
  body += 'const updatePrice = () => {';
  body += `fetch(location.protocol + "//${process.env.API_HOST}").then(response => {`;
  body += 'if (response.status !== 200) { return }';
  body += 'response.text().then(price => {';
  body += 'document.title = "1 BTC = " + price + " USD";';
  body += 'document.getElementById("price").textContent = price;';
  body += '})';
  body += '}).catch(console.error);';

  for (const source of sources) {
    body += `fetch(location.protocol + "//${process.env.API_HOST}/${source}").then(response => {`;
    body += 'if (response.status !== 200) {';
    body += 'return';
    body += '}';
    body += 'response.text().then(price => {';
    body += `const element = document.getElementById("price-${source}");`;
    body += 'if (!element) { return }';
    body += `element.textContent = price;`;
    body += '})';
    body += '}).catch(console.error);';
  }

  body += '};';
  body += 'setInterval(updatePrice, 1000)';
  body += '</script>';
  body += '<pre>';
  body +=
    '   _     _ _            _                  _               _            <br>';
  body +=
    '  | |   (_) |          (_)                (_)             | |           <br>';
  body +=
    '  | |__  _| |_ ___ ___  _ _ __  _ __  _ __ _  ___ ___   __| | _____   __<br>';
  body +=
    "  | '_ \\| | __/ __/ _ \\| | '_ \\| '_ \\| '__| |/ __/ _ \\ / _` |/ _ \\ \\ / /<br>";
  body +=
    '  | |_) | | || (_| (_) | | | | | |_) | |  | | (_|  __/| (_| |  __/\\ V / <br>';
  body +=
    '  |_.__/|_|\\__\\___\\___/|_|_| |_| .__/|_|  |_|\\___\\___(_)__,_|\\___| \\_/  <br>';
  body +=
    '                               | |                                      <br>';
  body +=
    '                               |_|                                      <br>';
  body += '<br>';
  body +=
    '    — a hyperfast realtime Bitcoin price API without rate limits<br>';
  body += '<br>';
  body +=
    '------------------------------------------------------------------------<br>';
  body += '<br>';
  body += 'Formula:<br>';
  body += `    (${sources.join(' + ')}) / ${sources.length}<br>`;
  body += '<br>';

  body += 'Exchange prices:<br>';
  for (const source of sources) {
    const exchangePrice = await repository.getPriceForSource(source);
    if (!exchangePrice) {
      continue;
    }

    body += `    ${source}: $<span id="price-${source}">${exchangePrice}</span><br>`;
  }
  body += '<br>';

  body += 'API endpoints:<br>';
  body += `    <a href="https://${process.env.API_HOST}">https://${process.env.API_HOST}</a><br>`;
  for (const source of sources) {
    body += `    <a href="https://${process.env.API_HOST}/${source}">https://${process.env.API_HOST}/${source}</a><br>`;
  }
  body += `    <a href="https://${process.env.API_HOST}/24h/minutely">https://${process.env.API_HOST}/24h/minutely</a><br>`;
  body += '<br>';

  body +=
    '------------------------------------------------------------------------<br>';
  body += '<br>';
  body += `1 BTC = <span id="price">${price}</span> USD<br>`;
  body += '<br>';

  body +=
    '------------------------------------------------------------------------<br>';
  body += '<br>';

  const passedTime = new Date().getTime() - startTime;
  body += `page generated in ${passedTime}ms`;
  body += '</pre>';
  body += '</body></html>';

  res.setHeader('content-type', 'text/html');
  res.send(body);
};

export default root;
