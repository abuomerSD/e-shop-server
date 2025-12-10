import { NextFunction, Request, Response } from "express";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || "error";

  res.status(statusCode).json({
    status,
    message:
      err.message === "Validation error" ? err.errors[0].message : err.message, //sequelize validation error
    error: err,
  });

  next();
};

export default errorHandler;
