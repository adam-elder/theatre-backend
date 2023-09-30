const httpStatus = require("http-status");
const ApiError = require("../../../errors/ApiError");
const Cast = require("./cast.model");
const { default: mongoose, Types } = require("mongoose");
const Character = require("../character/character.model");

const createCast = async (data) => {
  const result = await Cast.create(data);
  return result;
};

const getAllCast = async (id) => {
  const result = await Cast.find({ user: id }).populate("characters");
  return result;
};

const deleteCast = async (id) => {
  const cast = await Cast.findById(id);
  if (!cast) {
    throw new ApiError(httpStatus.NOT_FOUND, "cast does not exist");
  }
  const result = await Cast.findByIdAndDelete(id);
  return result;
};

const deleteCastWithCharacters = async (id) => {
  const cast = await Cast.findById(id);
  if (!cast) {
    throw new ApiError(httpStatus.NOT_FOUND, "cast does not exist");
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    await Promise.all(
      cast.characters.map((characterId) => {
        return Character.deleteOne({ _id: characterId }, { session });
      })
    );
    await Cast.findByIdAndDelete(id, { session });
    await session.commitTransaction();
    await session.endSession();
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw err;
  }
};

const getCast = async (id) => {
  const cast = await Cast.findOne({ _id: id });
  if (!cast) {
    throw new ApiError(httpStatus.NOT_FOUND, "cast does not exist");
  }
  const result = await Cast.findById({ _id: id }).populate({
    path: "characters",
  });
  return result;
};

const updateCast = async (id, data) => {
  const cast = await Cast.findById(id);
  if (!cast) {
    throw new ApiError(httpStatus.NOT_FOUND, "cast does not exist");
  }
  const result = await Cast.findByIdAndUpdate(id, data, { new: true });
  return result;
};

module.exports = {
  createCast,
  getAllCast,
  getCast,
  deleteCast,
  deleteCastWithCharacters,
  updateCast,
};
