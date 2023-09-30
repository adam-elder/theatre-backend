const express = require("express");
const router = express.Router();
const userRoutes = require("../modules/user/user.route");
const characterRoutes = require("../modules/character/character.route");
const castRoutes = require("../modules/cast/cast.route");
const enneagramTypeRoutes = require("../modules/enneagramType/enneagramType.route");
const relationshipRoutes = require("../modules/relationship/relationship.route");

const moduleRoutes = [
  { path: "/user", route: userRoutes },
  { path: "/character", route: characterRoutes },
  { path: "/cast", route: castRoutes },
  { path: "/enneagram-type", route: enneagramTypeRoutes },
  { path: "/relationship", route: relationshipRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

module.exports = router;
