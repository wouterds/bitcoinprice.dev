import { Request, Response } from 'express';
import fetch from 'node-fetch';

const root = async (_req: Request, res: Response): Promise<void> => {
  const response = await fetch('https://www.blockchain.com/ticker');
  const data = await response.json();
  const price = data?.USD?.last;

  let body = '';
  body += '<!DOCTYPE html>';
  body += '<html lang="en">';
  body += '<head>';
  body += '<meta charset="utf-8">';
  body += '<title>bitcoinlive.dev</title>';
  body += '</head>';
  body += '<body>';
  body += '<pre>';
  body += '  _     _ _            _       _ _                _            <br>';
  body += ' | |   (_) |          (_)     | (_)              | |           <br>';
  body += ' | |__  _| |_ ___ ___  _ _ __ | |___   _____   __| | _____   __<br>';
  body +=
    " | '_ \\| | __/ __/ _ \\| | '_ \\| | \\ \\ / / _ \\ / _` |/ _ \\ \\ / /<br>";
  body +=
    ' | |_) | | || (_| (_) | | | | | | |\\ V /  __/| (_| |  __/\\ V / <br>';
  body +=
    ' |_.__/|_|\\__\\___\\___/|_|_| |_|_|_| \\_/ \\___(_)__,_|\\___| \\_/  <br>';
  body += '                                                               <br>';
  body += ' --------------------------------------------------------------<br>';
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
