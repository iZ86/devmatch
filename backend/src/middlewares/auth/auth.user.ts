import mongoose, { Types } from 'mongoose';
import { Request, Response, NextFunction as Next } from 'express';
import AuthService from '../../services/auth.service';
import { ENUM_TOKEN_TYPE } from '../../core/enums';
import { JwtPayloadDto } from '../../dtos/auth.dto';
import { UserModel } from '../../models/user.model';

export default function (req: Request, res: Response, next: Next) {
  const authHeader: string = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token: string = authHeader.split(' ')[1];

    try {
      const decodedToken: JwtPayloadDto = AuthService.verifyToken(token, ENUM_TOKEN_TYPE.AUTH);

      const userId: Types.ObjectId = new mongoose.Types.ObjectId(decodedToken.user._id.toString());
      const email: string = decodedToken.user.email;

      UserModel.exists({
        _id: userId,
        email,
      }).then(
        (result) => {
          if (!result) {
            return res.status(401).json('User not found');
          }

          req['user'] = decodedToken.user;
          return next();
        }, (err) => {
          return res.status(401).json({
            success: false,
            message: err,
          });
        });
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token.',
      });
    }
  } else {
    return res.status(401).json({
      success: false,
      message: 'No Token Provided',
    });
  }
}