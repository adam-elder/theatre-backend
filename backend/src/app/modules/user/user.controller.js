const userService = require("./user.service");
const catchAsync = require("../../../shared/catchAsync");
const httpStatus = require("http-status");
const sendResponse = require("../../../shared/sendResponse");
const config = require("../../../config");

const createUser = catchAsync(async (req, res) => {
  const signupData = req.body;
  const result = await userService.createUser(signupData);
  const cookieOptions = { httpOnly: true, secure: config.env === "production" };

  res.cookie("accessToken", result.token, cookieOptions);
  sendResponse(res, {
    message: "user created successfuly",
    statusCode: httpStatus.OK,
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const loginData = req.body;
  const result = await userService.loginUser(loginData);
  const cookieOptions = { httpOnly: true, secure: config.env === "production" };
  res.cookie("accessToken", result.token, cookieOptions);
  sendResponse(res, {
    message: "user loggedin successful",
    statusCode: httpStatus.OK,
    data: result,
  });
});

module.exports = {
  createUser,
  loginUser,
};
