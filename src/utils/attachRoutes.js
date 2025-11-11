import userRouter from "../routes/user.route.js";

export const attachRoutes = (app) => {
  app.use("/api/v1/users", userRouter);
};
