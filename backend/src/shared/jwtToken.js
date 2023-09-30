const jwt = require("jsonwebtoken");
const createToken = (userData, secret, expireTime) => {
  const token = jwt.sign(userData, secret, { expiresIn: expireTime });
  return token;
};

const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};

module.exports = {
  createToken,
  verifyToken,
};
