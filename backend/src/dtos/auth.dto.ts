import { ENUM_TOKEN_TYPE } from '../core/enums';
import { IUser } from '../models/user.model';

export interface LoginDto {
  email: string;
  password: string;
}

export interface RefreshTokenDto {
  refreshToken: string;
}

export interface UpdateMeDto {
  name?: string;
  settings: {
    isAnonymous?: boolean;
  }
}

export interface JwtPayloadDto {
  tokenType: ENUM_TOKEN_TYPE;
  user: IUser;
  iat?: number;
  exp?: number;
}