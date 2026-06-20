const Book = require("../models/Book");

const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Book Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const issueBook = async (req, res) => {
  try {
    console.log("REQ BODY =>", req.body);
    const {
 memberId,
 memberName,
 memberEmail,
 studentId,
 customBookId
}=req.body;
    const book = await Book.findById(req.params.id);

    if (!book) return res.status(404).json({ message: "Book not found" });

    if (book.quantity <= 0)
      return res.status(400).json({ message: "Book unavailable" });

    if (!book.issuedTo) book.issuedTo = [];

    const date = new Date().toLocaleDateString("en-IN");
    const time = new Date().toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });

    book.quantity -= 1;

   book.issuedTo.push({

  memberId,

  memberName,

  memberEmail,

  studentId,

  customBookId,


  date,

  time

});
    await book.save();

    res.status(200).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const returnBook = async (req, res) => {
  try {
    const { memberName } = req.body;

    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    const issueIndex =
      book.issuedTo.findIndex(
        (item) =>
          item.memberName === memberName
      );

    if (issueIndex === -1) {
      return res.status(400).json({
        message: "Issue record not found",
      });
    }

    book.issuedTo.splice(issueIndex, 1);

    book.quantity += 1;

    await book.save();

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addBook,
  getBooks,
  updateBook,
  deleteBook,
  issueBook,
  returnBook,
};