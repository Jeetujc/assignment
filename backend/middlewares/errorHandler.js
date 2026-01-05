import c from '../constants.js';

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode? res.statusCode : 500;
    console.log("Error Handler Invoked", statusCode, err.message);
    switch (statusCode) {
        case c.VALIDATION_ERROR:
            res.json({
                title: "Validation Error",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case c.UNAUTHORIZED_ERROR:
            res.json({
                title: "Unauthorized Error",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case c.FORBIDDEN_ERROR:
            res.json({
                title: "Forbidden Error",
                message: err.message,
                stackTrace: err.stack
                });
            break;
        case c.NOT_FOUND_ERROR:
            res.json({
                title: "Not Found Error",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case c.SERVER_ERROR:
            res.json({
                title: "Server Error",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        default:
            console.log("No error, all good!");
            break;
    }
};

export default errorHandler;