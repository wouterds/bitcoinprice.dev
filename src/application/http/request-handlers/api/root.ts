import { Request, Response } from 'express';

const root = async (_req: Request, res: Response): Promise<void> => {
  res.setHeader('content-type', 'text/plain');
  res.send('soon');
};

export default root;
