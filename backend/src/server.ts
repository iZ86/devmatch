import express, { Application } from "express";
import Server from "./app/index";
import "dotenv/config";
import * as db from "./app/db";

const app: Application = express();
const server: Server = new Server(app);
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

db.connect(() => {
  app.listen(PORT, "localhost", () => {
    console.log(`Server is running on port ${PORT}.`);
  });

  app.on('error', onError);
});

function onError(error: any): void {
  if (error.syscall !== 'listen') throw error;
  const bind = (typeof PORT === 'string') ? `Pipe ${PORT}` : `Port ${PORT}`;
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

// app crash handling; catch unexpected error to prevent app crash
process.on('uncaughtException', (error) => {
  console.error(error.stack);
  process.exit(1);
});