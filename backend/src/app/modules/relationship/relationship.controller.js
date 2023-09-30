const httpStatus = require("http-status");
const catchAsync = require("../../../shared/catchAsync");
const sendResponse = require("../../../shared/sendResponse");
const relationshipService = require("./relationship.service");

const createRelationShip = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await relationshipService.createRelationShip(data);
  sendResponse(res, {
    message: "relationship created successfully",
    statusCode: httpStatus.OK,
    data: result,
  });
});

const getAllRelationship = catchAsync(async (req, res) => {
  const result = await relationshipService.getAllRelationship();
  sendResponse(res, {
    message: "all relationship retreived successfully",
    statusCode: httpStatus.OK,
    data: result,
  });
});

const getRelationship = catchAsync(async (req, res) => {
  const { type1, type2 } = req.query;
  const result = await relationshipService.getRelationShip(
    Number(type1),
    Number(type2)
  );
  sendResponse(res, {
    message: "relationship retreived successfully",
    statusCode: httpStatus.OK,
    data: result,
  });
});

module.exports = {
  createRelationShip,
  getAllRelationship,
  getRelationship,
};
