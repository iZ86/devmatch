import { Request, Response, NextFunction as Next } from 'express';
import authUser from './auth.user';
import { ENUM_USER_ROLE } from '../../core/enums';

export default function (req: Request, res: Response, next: Next) {
  authUser(req, res, () => {
    if (req['user'].role !== ENUM_USER_ROLE.ADMIN) {
      return res.status(401).json({
        success: false,
        message: 'Admin access required',
      });
    }
    return next();
  });
}