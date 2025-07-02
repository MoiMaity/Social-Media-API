// src/middlewares/errorHandler.js

import winston from "winston";

// Winston Logger Configuration
const logger = winston.createLogger({
  level: "error",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "logs/error.log" }),
    new winston.transports.Console(), // optional in production
  ],
});

// Custom Error Class
export class customErrorHandler extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

// Error Handling Middleware
export const errorHandlerMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errorMessage =
    err.message || "Oops! Something went wrong... Please try again later!";

  // Log the error using Winston
  logger.error({
    level: "error",
    timestamp: new Date().toString(),
    "request URL": req.originalUrl,
    "error message": errorMessage,
  });

  // Send error response
  res.status(statusCode).json({
    success: false,
    message:
      statusCode === 500
        ? "Oops! Something went wrong... Please try again later!"
        : errorMessage,
  });
};
