import {
  createContext,
  useState,
  useEffect,
} from "react";

import API from "../api/api";


// eslint-disable-next-line react-refresh/only-export-components
export const BooksContext = createContext();


const BooksProvider = ({ children }) => {

  const [books, setBooks] = useState([]);


  useEffect(() => {
    fetchBooks();
  }, []);



  // 📚 Get All Books
  const fetchBooks = async () => {
    try {

      const response = await API.get("/books");

      setBooks(response.data);

    } catch (error) {

      console.error(
        "Fetch Books Error:",
        error
      );

    }
  };



  // ➕ Add Book
  const addBook = async (book) => {

    try {

      const response = await API.post(
        "/books",
        book
      );


      setBooks((prev) => [
        ...prev,
        response.data,
      ]);


    } catch(error){

      console.error(
        "Add Book Error:",
        error
      );

    }
  };




  // ❌ Delete Book
  const deleteBook = async (id) => {

    try {

      await API.delete(
        `/books/${id}`
      );


      setBooks((prev)=>
        prev.filter(
          (book)=>book._id !== id
        )
      );


    } catch(error){

      console.error(
        "Delete Book Error:",
        error
      );

    }

  };





  // ✏️ Update Book
  const updateBook = async (updatedBook) => {

    try {

      const response = await API.put(
        `/books/${updatedBook._id}`,
        updatedBook
      );


      setBooks((prev)=>
        prev.map((book)=>
          book._id === updatedBook._id
          ? response.data
          : book
        )
      );


    } catch(error){

      console.error(
        "Update Book Error:",
        error
      );

    }

  };





  // 📖 Issue Book
  const issueBook = async (
    bookId,
    member,
    customBookId=null
  ) => {


    try {


      const response = await API.put(
        `/books/${bookId}/issue`,
        {

          memberId: member._id,

          memberName: member.name,

          memberEmail: member.email,

          studentId:
            member.studentId || null,

          customBookId

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
        "Issue Book Error:",
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


      const response = await API.put(
        `/books/${bookId}/return`,
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
        "Return Book Error:",
        error
      );

    }


  };




  return (

    <BooksContext.Provider

      value={{
        books,

        fetchBooks,

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