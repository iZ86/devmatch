import { Application } from "express";
import UserRoutes from "../modules/admin/user/user.route";
import PingRoutes from '../modules/security/ping/ping.route';
import AuthRoutes from "../modules/security/auth/auth.route";
import authAdmin from "../middlewares/auth/auth.admin";

export default class Routes {
  constructor(app: Application) {
    app.use("/api/v1/data/security/ping", PingRoutes);
    app.use("/api/v1/data/admin/users", authAdmin, UserRoutes);
    app.use("/api/v1/data/security/auth", AuthRoutes);
  }
}