import express from "express";
import { PORT } from "./config/env.config.js";
import { testDatabaseConnection } from "./config/sequelize.config.js";
import morgan from "morgan";
import attachRoutes from "./utils/attachRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";

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
