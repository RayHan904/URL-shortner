import passport from "passport";
import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const validationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  // Call next() if validation passed
  next();
};

// protecting route
export const protect = passport.authenticate("jwt", { session: false });

export const admin = (req, res, next) => {
  // Check if the user is authenticated

  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Check if the user has admin privileges
  if (req.user && req.user.is_admin) {
    return next();
  }

  return res.status(403).json({ message: "Forbidden" });
};
