import { Request, Response } from "express";
import { UserModel } from "../../../models/user.model";
import { CreateUserReqDto } from "../../../dtos/user.dto";
import { ENUM_USER_ROLE } from "../../../core/enums";

export default class UserController {
  getAllUsers(req: Request, res: Response) {
    UserModel.find({}, {
      passwordHash: 0,
    }).then(
      (result) => {
        return res.status(200).json({
          success: true,
          message: "Successfully get all users",
          data: result,
        });
      },
      (err) => {
        return res.status(400).json({
          success: false,
          message: "Failed get all users",
        });
      }
    );
  }

  createAdmin(req: Request, res: Response) {
    const dto: CreateUserReqDto = req.body;
    dto.role = ENUM_USER_ROLE.ADMIN;

    UserModel.create({
      ...dto,
      createdBy: 'req.user._id',
      updatedBy: 'req.user._id',
    }).then(
      (result) => {
        return res.status(200).json({
          success: true,
          message: "Successfully create admin",
          data: result,
        });
      },
      (err) => {
        return res.status(400).json({
          success: false,
          message: "Failed create user",
        });
      }
    );
  }
}