import bcrypt from "bcrypt";
import { waterfall } from "async";
import { Request, Response } from "express";
import { LoginDto } from "../../../dtos/auth.dto";
import { IUser, UserModel } from "../../../models/user.model";
import AuthService from "../../../services/auth.service";

export default class AuthController {
  register(req: Request, res: Response) {

  }

  login(req: Request, res: Response) {
    const dto: LoginDto = req.body;

    waterfall([
      // Check if user is in the db.
      (cb) => {
        UserModel.findOne({
          email: dto.email.trim().toLowerCase(),
        }).then(
          (result) => {
            if (!result) {
              return cb('Invalid email');
            }

            return cb(undefined, result);
          },
          (err) => {
            return cb('Invalid email');
          }
        );
      },

      // Compare user input password and db password is the same.
      // (user: IUser, cb) => {
      //   bcrypt.compare(dto.password, user.passwordHash).then(
      //     (isMatch) => {
      //       if (!isMatch) {
      //         return cb('Invalid password');
      //       }
      //     },
      //     (err) => {
      //       return cb('Invalid password');
      //     }
      //   );
      // },

      // Login user
      (user: IUser, cb) => {
        AuthService.loginAs(user).then(
          (result) => {
            return cb(undefined, result);
          },
          (err) => {
            return cb('Failed to login. Please try again.');
          }
        );
      },
    ], (err: string, data) => {
      if (err) {
        return res.status(404).json({
          success: false,
          message: err,
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Successfully Login',
        data,
      });
    });
  }

  refreshToken(req: Request, res: Response) {
    AuthService.loginAs(req['user']).then(
      (result) => {
        return res.status(200).json({
          success: true,
          message: 'Successfully Refreshed',
          data: result,
        });
      },
      (err) => {
        return res.status(400).json({
          success: false,
          message: 'Failed to Refresh',
        });
      }
    );
  }
}