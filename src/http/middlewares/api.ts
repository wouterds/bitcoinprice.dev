import { NextFunction, Request, Response } from 'express';

const apiMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  if (
    req.hostname !== process.env.API_HOST &&
    req.headers?.['x-forwarded-host'] !== process.env.API_HOST
  ) {
    res.sendStatus(403);
    return;
  }

  next();
};

export default apiMiddleware;
