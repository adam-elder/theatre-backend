const httpStatus = require("http-status");
const catchAsync = require("../../../shared/catchAsync");
const sendResponse = require("../../../shared/sendResponse");
const characterService = require("./character.service");

const createCharacter = catchAsync(async (req, res) => {
  const data = req.body;
  const { id } = req.user;
  const characterData = { ...data, user: id };
  const result = await characterService.createCharacter(characterData);
  sendResponse(res, {
    message: "character created successfuly",
    statusCode: httpStatus.OK,
    data: result,
  });
});

const getAllCharacter = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await characterService.getAllCharacter(user.id);
  sendResponse(res, {
    message: "all characters retreived successfuly",
    statusCode: httpStatus.OK,
    data: result,
  });
});

const deleteCharacter = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await characterService.deleteCharacter(id);
  sendResponse(res, {
    message: "character deleted successfuly",
    statusCode: httpStatus.OK,
    data: result,
  });
});

const getSingleCharacter = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await characterService.getSingleCharacter(id);
  sendResponse(res, {
    message: "single character retrieved successfuly",
    statusCode: httpStatus.OK,
    data: result,
  });
});

const updateCharacter = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const result = await characterService.updateCharacter(id, data);
  sendResponse(res, {
    message: "character updated successfuly",
    statusCode: httpStatus.OK,
    data: result,
  });
});

module.exports = {
  createCharacter,
  getAllCharacter,
  deleteCharacter,
  updateCharacter,
  getSingleCharacter,
};
