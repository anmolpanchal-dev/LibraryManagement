const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    author: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    quantity: {
      type: Number,
      required: true,
      default: 1,
    },

    issuedTo: [
      {
        memberName: String,
        date: String,
        time: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Book", bookSchema);