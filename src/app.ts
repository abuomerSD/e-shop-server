import express, {Request, Response} from "express";
import { PORT } from "./config/env.config";
import { testDatabaseConnection } from "./config/sequelize.config";
import morgan from "morgan";
import attachRoutes from "./utils/attachRoutes";
import errorHandler from "./middlewares/errorHandler";

const app = express();

// middlewares
app.use(morgan("dev"));
app.use(express.json());

// test database connection
testDatabaseConnection();

// routes
attachRoutes(app);

// global error handler
app.use(errorHandler);

// Unhandled Rejections
process.on("unhandledRejection", (error) => {
  console.log("Unhandled Rejection: ", error.name, error.message);
  process.exit(1);
});

// Uncaught Exceptions
process.on("uncaughtException", (error) => {
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

app.listen(PORT, () => {
  console.log(`server is listening to port : ${PORT}`);
});
