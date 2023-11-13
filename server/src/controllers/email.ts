import { NextFunction, Request, Response } from "express";
import Email from "../models/email";
import asyncHandler from "express-async-handler";
import { ErrorResponse } from "../middleware/error";
import { sendConfirmationEmail } from "../services/email";
import crypto from "node:crypto";

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

    // todo: add token expiry date
    const token = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    await Email.create({
      email,
      confirmed: false,
      token: tokenHash,
    });

    await sendConfirmationEmail(email, token);

    res.status(201).json({
      success: true,
    });
  }
);

export const confirmEmail = asyncHandler(
  async (
    req: Request<{}, {}, {}, { token: string }>,
    res: Response,
    next: NextFunction
  ) => {
    const { token } = req.query;
    if (!token)
      return next(new ErrorResponse("Missing confirmation token", 400));

    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    const email = await Email.findOne({ token: tokenHash, confirmed: false });
    if (!email) return next(new ErrorResponse("Invalid token", 400));

    email.confirmed = true;
    await email.save();

    res.status(200).json({ success: true });
  }
);
