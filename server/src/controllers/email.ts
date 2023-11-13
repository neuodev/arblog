import { NextFunction, Request, Response } from "express";
import Email from "../models/email";
import asyncHandler from "express-async-handler";
import { ErrorResponse } from "../middleware/error";

export const addEmail = asyncHandler(
  async (
    req: Request<{}, {}, { email: string }>,
    res: Response,
    next: NextFunction
  ) => {
    const { email } = req.body;
    if (!email)
      return next(
        new ErrorResponse("missing email field in the request body", 400)
      );

    const result = await Email.create({
      email,
      confirmed: false,
    });

    res.status(201).json({
      success: true,
    });
  }
);
