const express = require("express");
const castController = require("./cast.controller");
const userValidation = require("../../middleware/userValidation");
const router = express.Router();

router.post("/create-cast", userValidation(), castController.createCast);
router.get("/:id", userValidation(), castController.getCast);
router.patch("/:id", userValidation(), castController.updateCast);
router.delete("/:id", userValidation(), castController.deleteCast);
router.delete(
  "/characters/:id",
  userValidation(),
  castController.deleteCastWithCharacters
);
router.get("/", userValidation(), castController.getAllCast);

module.exports = router;
