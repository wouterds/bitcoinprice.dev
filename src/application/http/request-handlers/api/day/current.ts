import { Request, Response } from 'express';

const current = async (_req: Request, res: Response): Promise<void> => {
  res.setHeader('content-type', 'text/plain');
  res.send('soon');
};

export default current;
