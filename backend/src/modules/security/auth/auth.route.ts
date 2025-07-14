import { Router } from "express";
import AuthController from "./auth.controller";
import authRefreshUser from "../../../middlewares/auth/auth-refresh.user";

class AuthRoutes {
  public router: Router = Router();
  private ctrl: AuthController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router
      .post('/refresh', authRefreshUser, this.ctrl.refreshToken)
      .post('/register', this.ctrl.register)
      .post('/login', this.ctrl.login);
  }
}

export default new AuthRoutes().router;