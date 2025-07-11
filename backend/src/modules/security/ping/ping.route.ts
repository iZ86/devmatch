import { Router } from "express";

class PingRoutes {
  router = Router();
  // ctrl = new EmployerController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/", (req, res) => {
      return res.status(200).json({
        success: true,
        message: "Ping",
      });
    });
  }
}

export default new PingRoutes().router;