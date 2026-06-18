const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["librarian", "student"],
      default: "student",
    },

    profileImage: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    rollNo: {
      type: String,
      default: "",
    },

    department: {
      type: String,
      default: "",
    },
    studentId: {
      type: String,
      unique: true,
    },

    borrowedBooks: [
      {
        bookId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Book",
        },
        issueDate: String,
        returnDate: String,
      }
    ]

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);