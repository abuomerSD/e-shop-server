import { UserAttributes } from "../sequelize";

declare global {
  namespace Express {
    interface Request {
      user?: UserAttributes;
      file: any;
    }
  }
}