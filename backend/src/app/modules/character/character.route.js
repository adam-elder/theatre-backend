const express = require("express");
const characterController = require("../character/character.controller");
const userValidation = require("../../middleware/userValidation");
const router = express.Router();

router.post(
  "/create-character",
  userValidation(),
  characterController.createCharacter
);
router.patch("/:id", userValidation(), characterController.updateCharacter);
router.get("/:id", userValidation(), characterController.getSingleCharacter);
router.delete("/:id", userValidation(), characterController.deleteCharacter);
router.get("/", userValidation(), characterController.getAllCharacter);

module.exports = router;
