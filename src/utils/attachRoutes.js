import userRouter from "../routes/user.route.js";

const attachRoutes = (app) => {
  app.use("/api/v1/users", userRouter);
};

export default attachRoutes;
