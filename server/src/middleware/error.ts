import { NextFunction, Request, Response } from "express";

export class ErrorResponse extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number = 400) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

const errorHandler = (
  err: Error | ErrorResponse | { message: string; code: number; name: string },
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let error = { ...err };

  error.message = err.message;
  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    const message = `Resource not found`;
    error = new ErrorResponse(message, 404);
  }

  // Mongoose duplicate key
  if ("code" in err && err.code === 11000) {
    const message = "Duplicate field value entered";
    error = new ErrorResponse(message, 400);
  }

  res.status(error instanceof ErrorResponse ? error.statusCode : 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

export default errorHandler;
