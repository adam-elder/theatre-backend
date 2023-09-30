const express = require("express");
const userValidation = require("../../middleware/userValidation");
const relationshipController = require("./relationship.controller");
const router = express.Router();

router.post("/create-relationship", relationshipController.createRelationShip);

router.get("/", userValidation(), relationshipController.getRelationship);

module.exports = router;
