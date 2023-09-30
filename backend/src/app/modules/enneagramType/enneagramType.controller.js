const httpStatus = require("http-status");
const catchAsync = require("../../../shared/catchAsync");
const sendResponse = require("../../../shared/sendResponse");
const enneagramService = require("./enneagramType.service");
const createEnnegramType = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await enneagramService.createEnneagramType(data);
  sendResponse(res, {
    message: "enneagramType created successfully",
    statusCode: httpStatus.OK,
    data: result,
  });
});

const getAllEnneagramType = catchAsync(async (req, res) => {
  const result = await enneagramService.getAllEnneagramType();
  sendResponse(res, {
    message: "all EnneagramType retreived successfully",
    statusCode: httpStatus.OK,
    data: result,
  });
});

const getEnneagramType = catchAsync(async (req, res) => {
  const { type } = req.params;
  const result = await enneagramService.getEnneagramType(type);
  sendResponse(res, {
    message: "single EnneagramType retreived successfully",
    statusCode: httpStatus.OK,
    data: result,
  });
});

module.exports = {
  createEnnegramType,
  getAllEnneagramType,
  getEnneagramType,
};
