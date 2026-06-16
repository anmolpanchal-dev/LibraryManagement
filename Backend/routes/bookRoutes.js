const express = require("express");

const {
  getBooks,
  addBook,
  updateBook,
  deleteBook,
  issueBook,
  returnBook,
} = require("../controllers/bookController");

const router = express.Router();

router.get("/", getBooks);

router.post("/", addBook);

router.put("/:id", updateBook);

router.delete("/:id", deleteBook);

router.put("/:id/issue", issueBook);

router.put("/:id/return", returnBook);

module.exports = router;