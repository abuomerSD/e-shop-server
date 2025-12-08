import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

const validatorMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).json({
      status: "fail",
      errors: result.array(),
    });
  }

  next();
};

export default validatorMiddleware;
