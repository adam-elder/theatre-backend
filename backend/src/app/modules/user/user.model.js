const { Schema, model } = require("mongoose");
const ApiError = require("../../../errors/ApiError");
const httpStatus = require("http-status");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

UserSchema.statics.isPasswordMatched = async function (
  savedPassword,
  givenPassword
) {
  return savedPassword === givenPassword;
};

UserSchema.pre("save", async function (next) {
  const user = await User.findOne({ email: this.email });
  if (user) {
    throw new ApiError(httpStatus.CONFLICT, "user already exist");
  }
  next();
});

const User = model("user", UserSchema);

module.exports = User;
