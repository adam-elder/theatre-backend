const express = require("express");
const router = require("./app/routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const globalErrorHandler = require("./app/middleware/globalErrorHandler");
const httpStatus = require("http-status");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use("/api/v1/", router);

app.use(globalErrorHandler);

app.use((req, res, next) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not found api",
    errorMessages: [{ path: req.originalUrl, message: "API Not found" }],
  });
  next();
});

module.exports = {
  app,
};
