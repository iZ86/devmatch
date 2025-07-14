import jwt from "jsonwebtoken";
import { waterfall } from "async";
import { ENUM_TOKEN_TYPE } from "../core/enums";
import { IUser, UserModel } from "../models/user.model";
import { JwtPayloadDto } from "../dtos/auth.dto";

export default class AuthService {
  static loginAs(user: IUser): Promise<{ authToken: string, refreshToken: string, user: IUser }> {
    return new Promise((resolve, reject) => {
      waterfall([
        (cb) => {
          UserModel.findOne({
            _id: user._id,
            email: user.email,
            role: user.role,
          }).then(
            (result) => {
              return cb(undefined, result);
            },
            (err) => {
              return cb('Failed to find user');
            }
          );
        },

        // Generate auth token and refresh token
        (user: IUser, cb) => {
          try {
            const authToken: string = this.generateToken(user, ENUM_TOKEN_TYPE.AUTH);
            const refreshToken: string = this.generateToken(user, ENUM_TOKEN_TYPE.REFRESH);

            if (!authToken || !refreshToken) {
              return cb('Failed to Generate Token');
            }

            return cb(undefined, {
              authToken, refreshToken, user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phoneNo: user.phoneNo,
                role: user.role,
              }
            });
          } catch (err) {
            return cb(err);
          }
        }
      ], (err: string, data: { authToken: string, refreshToken: string, user: IUser }) => {
        if (err) {
          return reject(err);
        }

        return resolve(data);
      });
    });
  }

  static generateToken(user: IUser, tokenType: ENUM_TOKEN_TYPE): string {
    try {
      const secretKeyMap = {
        [ENUM_TOKEN_TYPE.AUTH]: process.env.AUTH_SECRET_KEY,
        [ENUM_TOKEN_TYPE.REFRESH]: process.env.REFRESH_SECRET_KEY,
      };

      const expiryMap = {
        [ENUM_TOKEN_TYPE.AUTH]: Number(process.env.AUTH_TOKEN_EXPIRES_IN_MINS || 15),
        [ENUM_TOKEN_TYPE.REFRESH]: Number(process.env.REFRESH_TOKEN_EXPIRES_IN_MINS || 43200),
      };

      const secretKey = secretKeyMap[tokenType];
      const expiresIn = expiryMap[tokenType] * 60;

      const token = jwt.sign({
        tokenType,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phoneNo: user.phoneNo,
          role: user.role,
        }
      }, secretKey, { expiresIn });
      return token;
    } catch (err) {
      return `Failed to Generate ${tokenType.charAt(0).toUpperCase() + tokenType.slice(1)} Token.`;
    }
  }

  static verifyToken(token: string, tokenType: ENUM_TOKEN_TYPE): JwtPayloadDto {
    try {
      // Determine the secret key based on token type
      const secretKey = {
        [ENUM_TOKEN_TYPE.AUTH]: process.env.AUTH_SECRET_KEY,
        [ENUM_TOKEN_TYPE.REFRESH]: process.env.REFRESH_SECRET_KEY,
      }[tokenType];

      const decoded: JwtPayloadDto = jwt.verify(token, secretKey) as JwtPayloadDto;

      // Validate the token type matches
      if (decoded.tokenType !== tokenType) {
        throw new Error('Invalid Token Type');
      }
      return decoded;
    } catch (err) {
      throw new Error(`Failed to Verify ${tokenType.charAt(0).toUpperCase() + tokenType.slice(1)} Token`);
    }
  }
}