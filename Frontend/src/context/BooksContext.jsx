import axios from "axios";
import {
  createContext,
  useState,
  useEffect,
} from "react";
// eslint-disable-next-line react-refresh/only-export-components
export const BooksContext = createContext();
const BooksProvider = ({ children }) => {
const [books, setBooks] = useState([]);
useEffect(() => {
  fetchBooks();
}, []);

const fetchBooks = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/books"
    );

    setBooks(response.data);
  } catch (error) {
    console.error(error);
  }
};
  // ➕ Add Book
const addBook = async (book) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/books",
      book
    );

    setBooks((prev) => [
      ...prev,
      response.data,
    ]);
  } catch (error) {
    console.error(error);
  }
};

  // ❌ Delete Book
const deleteBook = async (id) => {
  try {
    await axios.delete(
      `http://localhost:5000/api/books/${id}`
    );

    setBooks((prev) =>
      prev.filter(
        (book) => book._id !== id
      )
    );
  } catch (error) {
    console.error(error);
  }
};

  // ✏️ Update Book
const updateBook = async (updatedBook) => {
  try {
    const response = await axios.put(
      `http://localhost:5000/api/books/${updatedBook._id}`,
      updatedBook
    );

    setBooks((prev) =>
      prev.map((book) =>
        book._id === updatedBook._id
          ? response.data
          : book
      )
    );
  } catch (error) {
    console.error(error);
  }
};
  // 📚 Issue Book
const issueBook = async (
  bookId,
  member,
  customBookId = null
) => {

  console.log("🔥 ISSUE FUNCTION RUNNING");
  console.log("MEMBER =>", member);
  console.log("CUSTOM BOOK ID =>", customBookId);


  try {

    const response = await axios.put(
      `http://localhost:5000/api/books/${bookId}/issue`,
      {
        memberId: member._id,
        memberName: member.name,
        memberEmail: member.email,

        studentId: member.studentId || null,

        customBookId: customBookId || null
      }
    );

    console.log({
  memberId: member._id,
  memberName: member.name,
  memberEmail: member.email,
  studentId: member.studentId,
  customBookId: customBookId
});


    setBooks((prev)=>
      prev.map((book)=>
        book._id === bookId
        ? response.data
        : book
      )
    );


  } catch(error){

    console.error(
      "Issue Error:",
      error
    );

  }

};
  // 🔁 Return Book
const returnBook = async (
  bookId,
  memberName
) => {

  try {

    const response = await axios.put(
      `http://localhost:5000/api/books/${bookId}/return`,
      {
        memberName
      }
    );


    setBooks((prev)=>
      prev.map((book)=>
        book._id === bookId
        ? response.data
        : book
      )
    );


  } catch(error){

    console.error(
      "Return Error:",
      error
    );

  }

};

  return (
    <BooksContext.Provider
      value={{
        books,
        addBook,
        deleteBook,
        updateBook,
        issueBook,
        returnBook,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};

export default BooksProvider;
