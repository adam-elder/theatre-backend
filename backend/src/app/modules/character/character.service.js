const httpStatus = require("http-status");
const Character = require("./character.model");
const ApiError = require("../../../errors/ApiError");
const { default: mongoose } = require("mongoose");
const Cast = require("../cast/cast.model");

const createCharacter = async (data) => {
  const result = await Character.create(data);
  return result;
};

const getAllCharacter = async (id) => {
  const result = await Character.find({ user: id });
  return result;
};

const deleteCharacter = async (id) => {
  const character = await Character.findById(id);
  if (!character) {
    throw new ApiError(httpStatus.NOT_FOUND, "character does not exist");
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    await Character.deleteOne({ _id: id }, { session });
    await Cast.updateMany(
      { characters: { $elemMatch: { $eq: character._id } } },
      { $pull: { characters: character._id } },
      { session }
    );
    await session.commitTransaction();
    await session.endSession();
    return character;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw err;
  }
};
const getSingleCharacter = async (id) => {
  const user = await Character.findById(id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "user does not exist");
  }
  const result = await Character.findById(id);
  return result;
};

const updateCharacter = async (id, data) => {
  const user = await Character.findById(id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "user does not exist");
  }
  const result = await Character.findByIdAndUpdate(id, data, { new: true });
  return result;
};

module.exports = {
  createCharacter,
  getAllCharacter,
  deleteCharacter,
  updateCharacter,
  getSingleCharacter,
};
