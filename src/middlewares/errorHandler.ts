const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || "error";

  res.status(statusCode).json({
    status,
    message:
      err.message === "Validation error" ? err.errors[0].message : err.message, //sequelize validation error
  });

  next();
};

export default errorHandler;
