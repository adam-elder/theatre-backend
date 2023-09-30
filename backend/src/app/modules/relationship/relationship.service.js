const httpStatus = require("http-status");
const ApiError = require("../../../errors/ApiError");
const Relationship = require("./relationship.model");

const createRelationShip = async (data) => {
  const result = await Relationship.create(data);
  return result;
};
const getAllRelationship = async () => {
  const result = await Relationship.find();
  return result;
};

const getRelationShip = async (type1, type2) => {
  const relationship = await Relationship.findOne({
    $or: [
      { type1: type1, type2: type2 },
      { type1: type2, type2: type1 },
    ],
  });

  if (!relationship) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "there is no relationship between two characters types"
    );
  }
  return relationship;
};
module.exports = {
  getAllRelationship,
  createRelationShip,
  getRelationShip,
};
