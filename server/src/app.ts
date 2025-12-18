import express, { NextFunction, Request, Response } from "express";
import { PORT } from "./config/env.config";
import { testDatabaseConnection } from "./config/sequelize.config";
import morgan from "morgan";
import attachRoutes from "./utils/attachRoutes";
import errorHandler from "./middlewares/errorHandler";
import { swaggerDocs } from "./swagger";
import "./models/index";
import { insertDefaultUser } from "./utils/insertDefaultUser";

const app = express();

// middlewares
app.use(morgan("dev"));
app.use(express.json());

// manual logger
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// test database connection
testDatabaseConnection()
  .then(() => {
    // insert default user
    insertDefaultUser();
  })
  .catch((err) => console.log(err));

// routes
attachRoutes(app);

// swagger
swaggerDocs(app);

// Unhandled Rejections
process.on("unhandledRejection", (error: any) => {
  console.log("Unhandled Rejection: ", error.name, error.message);
  process.exit(1);
});

// Uncaught Exceptions
process.on("uncaughtException", (error: any) => {
  console.log("Uncaught Exceptions: ", error.name, error.message);
  process.exit(1);
});

// NotFound Routes
app.use((req, res) => {
  res.status(404).json({
    status: "fail",
    message: "route not found",
  });
});

// global error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server is listening to port : ${PORT}`);
});
