import express, { Request, Response } from 'express';

const host = `${process.env.HOST}`;
const port = parseInt(`${process.env.PORT}`);

const app = express();

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(port, host, () => {
  console.log(`Running on http://${host}:${port} 🚀`);
});
