const express = require("express");
const userValidation = require("../../middleware/userValidation");
const enneagramTypeController = require("./enneagramType.controller");
const router = express.Router();

router.post(
  "/create-enneagram-type",
  enneagramTypeController.createEnnegramType
);

router.get(
  "/:type",
  userValidation(),
  enneagramTypeController.getEnneagramType
);

router.get("/", userValidation(), enneagramTypeController.getAllEnneagramType);

module.exports = router;
