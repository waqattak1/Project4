import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      userId?: JwtPayload | string;
    }
  }
}

declare module 'jsonwebtoken' {
  export interface JwtPayload {
    userId?: string;
  }
}
