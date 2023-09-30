const httpStatus = require("http-status");
const ApiError = require("../../errors/ApiError");
const { verifyToken } = require("../../shared/jwtToken");
const config = require("../../config");

const userValidation = () => {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(
          httpStatus.UNAUTHORIZED,
          "you are unauthorized user"
        );
      }
      let verifiedToken = null;
      verifiedToken = verifyToken(token, config.jwt_secret);

      req.user = verifiedToken;
      next();
    } catch (err) {
      next(err);
    }
  };
};

module.exports = userValidation;
