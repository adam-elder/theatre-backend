const handleValidationError = (err) => {
  const errorMessages = Object.keys(err.errors).map((error) => ({
    path: err.errors[error]?.path,
    message: err.errors[error]?.message,
  }));
  return {
    statusCode: 400,
    message: "validation Error",
    errorMessages,
  };
};
module.exports = handleValidationError;
