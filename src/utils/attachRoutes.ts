import userRouter from "../routes/user.route";
import authRouter from "../routes/auth.route";
import categoryRouter from "../routes/category.route";
import subCategoryRouter from "../routes/subCategory.route";
import brandsRouter from "../routes/brand.route";

const attachRoutes = (app: any) => {
  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/categories", categoryRouter);
  app.use("/api/v1/subCategories", subCategoryRouter);
  app.use("/api/v1/brands", brandsRouter);
};

export default attachRoutes;
