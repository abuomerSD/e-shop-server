export const errorHandler = (err, req, res, next) => {
  res.status(500).json({
    status: "error",
    message:
      err.message === "Validation error" ? err.errors[0].message : err.message, //sequelize validation error
  });

  next();
};
