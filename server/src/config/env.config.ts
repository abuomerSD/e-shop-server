import dotenv from "dotenv";

dotenv.config();

// server port
export const PORT = process.env.PORT || 3000;

// Node environment
export const NODE_ENV = process.env.NODE_ENV;

// database
export const DB_NAME = process.env.DB_NAME || "";
export const DB_USER = process.env.DB_USER || "";
export const DB_PASSWORD = process.env.DB_PASSWORD || "";
export const DB_HOST = process.env.DB_HOST || "";
export const DB_DIALECT = process.env.DB_DIALECT || "";

// testing
export const API_TEST_URL = process.env.API_TEST_URL || "";

// jwt
export const JWT_SECRET = process.env.JWT_SECRET || "";

// default admin user
export const DEFAULT_USER_NAME = process.env.DEFAULT_USER_NAME;
export const DEFAULT_USER_EMAIL = process.env.DEFAULT_USER_EMAIL;
export const DEFAULT_USER_PASSWORD = process.env.DEFAULT_USER_PASSWORD;
