import { Request, Response } from 'express';
import fetch from 'node-fetch';

const root = async (_req: Request, res: Response): Promise<void> => {
  const response = await fetch('https://www.blockchain.com/ticker').catch();
  const data = await response?.json();
  const price = data?.USD?.last || null;

  let body = '';
  body += '<!DOCTYPE html>';
  body += '<html lang="en">';
  body += '<head>';
  body += '<meta charset="utf-8">';
  body += '<title>bitcoinprice.dev</title>';
  body += '</head>';
  body += '<body>';
  body += '<pre>';
  body +=
    '  _     _ _            _                  _               _            <br>';
  body +=
    ' | |   (_) |          (_)                (_)             | |           <br>';
  body +=
    ' | |__  _| |_ ___ ___  _ _ __  _ __  _ __ _  ___ ___   __| | _____   __<br>';
  body +=
    " | '_ \\| | __/ __/ _ \\| | '_ \\| '_ \\| '__| |/ __/ _ \\ / _` |/ _ \\ \\ / /<br>";
  body +=
    ' | |_) | | || (_| (_) | | | | | |_) | |  | | (_|  __/| (_| |  __/\\ V / <br>';
  body +=
    ' |_.__/|_|\\__\\___\\___/|_|_| |_| .__/|_|  |_|\\___\\___(_)__,_|\\___| \\_/  <br>';
  body +=
    '                              | |                                      <br>';
  body +=
    '                              |_|                                      <br>';
  body += '                                                               <br>';
  body +=
    ' ----------------------------------------------------------------------<br>';
  if (price) {
    body += '<br>';
    body += ` 1 Bitcoin = $${price}`;
  }
  body += '</pre>';
  body += '</body>';
  body += '</html>';

  res.setHeader('content-type', 'text/html');
  res.send(body);
};

export default root;
