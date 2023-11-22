import passport from "passport";
import { validationResult } from "express-validator";
export const validationMiddleware = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400);
        throw new Error(errors.array()[0].msg);
    }
    // Call next() if validation passed
    next();
};
export const protect = (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
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
        }
        catch (error) {
            // Handle any unexpected errors
            console.error("Error during authentication:", error);
            next(error);
        }
    })(req, res, next);
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
//# sourceMappingURL=authMiddleware.js.map