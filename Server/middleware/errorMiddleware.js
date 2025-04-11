const routeNotFound = (req, res, next) => {
    const error = new Error(`Route not found: ${req.originalUrl}`);
    res.status(404);
    next(error);
};

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;
    if (err.name === "CastError" && err.kind === "ObjectId") {
        message = "Resource not found";
    }
    res.status(statusCode).join({
        message: message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
};
export { routeNotFound, errorHandler };
