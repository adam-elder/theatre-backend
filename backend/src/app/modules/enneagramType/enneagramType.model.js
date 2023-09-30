const { model, Schema } = require("mongoose");

const EnneagramTypeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    enneagram_number: {
      type: Number,
      required: true,
    },
    core_motivation: {
      type: String,
      required: true,
    },
    left_wing: {
      type: Number,
      required: true,
    },
    right_wing: {
      type: Number,
      required: true,
    },
    sp: {
      type: String,
      required: true,
    },
    so: {
      type: String,
      required: true,
    },
    sx: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const EnneagramType = model("enneagramType", EnneagramTypeSchema);
module.exports = EnneagramType;
