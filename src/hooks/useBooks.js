import { useContext } from "react";
import { BooksContext } from "../context/BooksContext";

const useBooks = () => {
  return useContext(BooksContext);
};

export default useBooks;