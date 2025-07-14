import { Router } from "express";
import UserController from "./user.controller";

class UserRoutes {
  public router: Router = Router();
  private ctrl: UserController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get('/', this.ctrl.getAllUsers);
    this.router.post('/', this.ctrl.createAdmin);
  }
}

export default new UserRoutes().router;