const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.join(process.cwd(), ".env") });
module.exports = {
  env: process.env.NODE_DEV,
  port: process.env.PORT,
  databaseUrl: process.env.DATABASE_URL,
  jwt_secret: process.env.JWT_SECRET,
  jwt_expire_in: process.env.JWT_EXPIRE_IN,
};
