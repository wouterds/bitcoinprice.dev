import { Request, Response } from 'express';

const root = (_req: Request, res: Response): void => {
  res.send('Hello World!');
};

export default root;
