const handleCastError = (err) => {
  const errors = [
    {
      path: err.path,
      message: "invalid id",
    },
  ];
  const message = "Invalid Id";
  const statusCode = 400;
  return {
    statusCode,
    message,
    errorMessages: errors,
  };
};

module.exports = handleCastError;
