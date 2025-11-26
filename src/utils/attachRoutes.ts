import userRouter from "../routes/user.route.js";
import authRouter from "../routes/auth.route.js";
import categoryRouter from "../routes/category.route.js";

const attachRoutes = (app:any) => {
  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/categories", categoryRouter);
};

export default attachRoutes;
