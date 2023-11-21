const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`); // Casting to any for the 'next' parameter
    res.status(404);
    next(error);
};
const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;
    if (err.name === "CastError" && err.kind === "ObjectId") {
        statusCode = 404;
    }
    if (statusCode === 401) {
        message = "You are not authorized to access this resource.";
    }
    if (statusCode === 403) {
        message =
            "You do not have the necessary permissions to access this resource.";
    }
    if (statusCode === 404) {
        message = "Resource not Found";
    }
    if (statusCode === 500) {
        message = "Internal Server Error";
    }
    res.status(statusCode).json({
        success: false,
        message,
        // stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
};
export { notFound, errorHandler };
//# sourceMappingURL=errorMiddleware.js.map