const sendResponse = (res, data) => {
  res.status(data.statusCode).json({
    success: true,
    message: data.message,
    statusCode: data.statusCode,
    data: data.data,
  });
};

module.exports = sendResponse;
