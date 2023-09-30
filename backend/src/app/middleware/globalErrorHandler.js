const config = require("../../config");
const ApiError = require("../../errors/ApiError");
const handleCastError = require("../../errors/handleCastError");
const handleValidationError = require("../../errors/handleValidationError");

const globalErrorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = "something went wrong";
  let errorMessages = [];
  console.log(err);
  if (err?.name === "ValidationError") {
    // validation Error handler
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (err?.name === "CastError") {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    errorMessages = err?.message ? [{ path: "", message: err?.message }] : [];
  } else if (err instanceof Error) {
    message = err?.message;
    errorMessages = err?.message ? [{ path: "", message: err?.message }] : [];
  }

  // generic error format send for frontend;
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== "production" ? err?.stack : undefined,
  });
};

module.exports = globalErrorHandler;
