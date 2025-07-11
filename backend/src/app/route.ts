import { Application, Request, Response } from "express";
import PingRoutes from '../modules/security/ping/ping.route';

export default class Routes {
  constructor(app: Application) {
    app.use("/api/v1/data/security/ping", PingRoutes);

  }
}