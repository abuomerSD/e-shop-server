import userRouter from "../routes/user.route.js";
import authRouter from "../routes/auth.route.js";

const attachRoutes = (app) => {
  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/auth", authRouter);
};

export default attachRoutes;
