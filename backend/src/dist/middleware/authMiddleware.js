import passport from "passport";
import { validationResult } from "express-validator";
export const validationMiddleware = (req, res, next) => {
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
export const isAdmin = (req, res, next) => {
    // Check if the user is authenticated
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    // Check if the user has admin privileges
    if (req.user && req.user.email == "rehan@gmail.com") {
        return next();
    }
    return res.status(403).json({ message: "Forbidden" });
};
//# sourceMappingURL=authMiddleware.js.map