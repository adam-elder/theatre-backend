const EnneagramType = require("./enneagramType.model");

const createEnneagramType = async (data) => {
  const result = await EnneagramType.create(data);
  return result;
};
const getAllEnneagramType = async () => {
  const result = await EnneagramType.find();
  return result;
};
const getEnneagramType = async (type) => {
  const result = await EnneagramType.findOne({ enneagram_number: type });
  return result;
};

module.exports = {
  getAllEnneagramType,
  createEnneagramType,
  getEnneagramType,
};
