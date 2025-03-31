const { constant } = require('../constant.js');


const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    switch (statusCode) {
        case constant.VALIDATION_ERROR:
            res.json({
                title: "Validation Error",
                message: err.message,
                stack: err.stack,
            });
            break;
        case constant.UNAUTHORIZED:
            res.json({
                title: "Unauthorized",
                message: err.message,
                stack: err.stack,
            });
            break;
        case constant.FORBIDDEN:
            res.json({
                title: "Forbidden",
                message: err.message,
                stack: err.stack,
            });
            break;
        case constant.NOT_FOUND:
            res.json({
                title: "Not Found",
                message: err.message,
                stack: err.stack,
            });
            break;
        default:
            console.log("No error, all good!");
            break;
    }
}

module.exports = errorHandler;
