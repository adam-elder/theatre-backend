const User = require("./user.model");
const config = require("../../../config");
const { createToken } = require("../../../shared/jwtToken");
const ApiError = require("../../../errors/ApiError");
const httpStatus = require("http-status");

const createUser = async (data) => {
  const user = await User.create(data);
  let token;
  if (user) {
    token = createToken(
      { id: user._id, email: user.email },
      config.jwt_secret,
      config.jwt_expire_in
    );
  } else {
    throw new Error("failed to create user");
  }
  return { user, token };
};

const loginUser = async (loginData) => {
  const { email, password } = loginData || {};
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "user not found");
  }
  const isPasswordMatched = await User.isPasswordMatched(
    user.password,
    password
  );
  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "incorrect password");
  }
  const { password: savedPassword, ...restData } = user.toObject();
  const token = createToken(
    { id: user._id, email: user.email },
    config.jwt_secret,
    config.jwt_expire_in
  );

  return {
    user: restData,
    token,
  };
};

module.exports = {
  createUser,
  loginUser,
};
