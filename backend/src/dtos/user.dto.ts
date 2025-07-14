import { ENUM_USER_ROLE } from "../core/enums";

export interface CreateUserReqDto {
  name: string;
  email: string;
  phoneNo: string;
  role: ENUM_USER_ROLE;
  passwordHash: string;
}