import { Request, Response } from 'express';

const root = (_req: Request, res: Response): void => {
  let response = '';
  response += '<!DOCTYPE html>';
  response += '<html lang="en">';
  response += '<head>';
  response += '<meta charset="utf-8">';
  response += '<title>bitcoinlive.dev</title>';
  response += '</head>';
  response += '<body>';
  response += '<pre>';
  response +=
    '  _     _ _            _       _ _                _            <br>';
  response +=
    ' | |   (_) |          (_)     | (_)              | |           <br>';
  response +=
    ' | |__  _| |_ ___ ___  _ _ __ | |___   _____   __| | _____   __<br>';
  response +=
    " | '_ \\| | __/ __/ _ \\| | '_ \\| | \\ \\ / / _ \\ / _` |/ _ \\ \\ / /<br>";
  response +=
    ' | |_) | | || (_| (_) | | | | | | |\\ V /  __/| (_| |  __/\\ V / <br>';
  response +=
    ' |_.__/|_|\\__\\___\\___/|_|_| |_|_|_| \\_/ \\___(_)__,_|\\___| \\_/  <br>';
  response +=
    '                                                               <br>';
  response += ' --------------------------------------------------------------';
  response += '</pre>';
  response += '</body>';
  response += '</html>';

  res.setHeader('content-type', 'text/html');
  res.send(response);
};

export default root;
