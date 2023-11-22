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
    res.status(400);
    throw new Error(errors.array()[0].msg);
  }

  // Call next() if validation passed
  next();
};

export const protect = (req: any, res: Response, next: NextFunction): void => {
  passport.authenticate(
    "jwt",
    { session: false },
    (err: Error, user: any, info: any) => {
      try {
        if (err) {
          // If an error occurs during authentication, return a 500 status
          res.status(500);
          throw new Error();
        }

        if (!user) {
          // If user is not found, return a 401 status with a custom error message
          res.status(401);
          throw new Error();
        }

        // If authentication is successful, attach the user to the request object
        req.user = user;
        next();
      } catch (error) {
        // Handle any unexpected errors
        console.error("Error during authentication:", error);
        next(error);
      }
    },
  )(req, res, next);
};

export const admin = (req, res, next) => {
  // Check if the user is authenticated

  if (!req.isAuthenticated()) {
    res.status(401);
    throw new Error();
  }

  // Check if the user has admin privileges
  if (req.user && req.user.is_admin) {
    return next();
  }

  res.status(403);
  throw new Error();
};
