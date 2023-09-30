const { model, Schema, Types } = require("mongoose");
const CastSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    characters: {
      type: [Types.ObjectId],
      required: true,
      ref: "character",
    },
    user: {
      type: Types.ObjectId,
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

const Cast = model("cast", CastSchema);
module.exports = Cast;
