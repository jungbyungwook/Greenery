const { Schema } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      max: 12,
      min: 4,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
    },
    introduce: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profileImg: {
      type: String,
    },
    level: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = userSchema;