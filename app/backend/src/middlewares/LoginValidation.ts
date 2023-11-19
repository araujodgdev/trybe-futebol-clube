import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export default class LoginValidation {
  static async signedUp(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const [, token] = authorization.split(' ');
    if (!token) return res.status(401).json({ message: 'Token must be a valid token' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string || 'secret');
      res.locals.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }

  static async login(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    next();
  }
}
