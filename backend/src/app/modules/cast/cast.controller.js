const httpStatus = require("http-status");
const catchAsync = require("../../../shared/catchAsync");
const castService = require("./cast.service");
const sendResponse = require("../../../shared/sendResponse");

const createCast = catchAsync(async (req, res) => {
  const data = req.body;
  const { id } = req.user;
  const castData = { ...data, user: id };
  const result = await castService.createCast(castData);
  sendResponse(res, {
    message: "cast created successfuly",
    statusCode: httpStatus.OK,
    data: result,
  });
});

const getAllCast = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await castService.getAllCast(user.id);
  sendResponse(res, {
    message: "all cast retrieved successfuly",
    statusCode: httpStatus.OK,
    data: result,
  });
});

const getCast = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await castService.getCast(id);
  sendResponse(res, {
    message: "single cast retrieved successfuly",
    statusCode: httpStatus.OK,
    data: result,
  });
});

const updateCast = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const result = await castService.updateCast(id, data);
  sendResponse(res, {
    message: "cast updated successfuly",
    statusCode: httpStatus.OK,
    data: result,
  });
});

const deleteCast = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await castService.deleteCast(id);
  sendResponse(res, {
    message: "cast deleted successfuly",
    statusCode: httpStatus.OK,
    data: result,
  });
});

const deleteCastWithCharacters = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await castService.deleteCastWithCharacters(id);
  sendResponse(res, {
    message: "cast deleted with all characters successfulfy",
    statusCode: httpStatus.OK,
    data: result,
  });
});

module.exports = {
  createCast,
  getAllCast,
  getCast,
  deleteCast,
  updateCast,
  deleteCastWithCharacters,
};
