import 'express';

declare module 'express' {
  interface Request {
    t: (key: string, options?: any) => string;
  }
}
