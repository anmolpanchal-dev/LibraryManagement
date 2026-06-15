import useBooks from "./useBooks";
import useMembers from "./useMembers";

const useDashboard = () => {
  const { books } = useBooks();
  const { members } = useMembers();

  // Total copies in library
  const totalBooks = books.reduce(
    (acc, book) => acc + (book.quantity || 0) + (book.issuedTo?.length || 0),
    0
  );

  // Available copies
  const availableBooks = books.reduce(
    (acc, book) => acc + (book.quantity || 0),
    0
  );

  // Issued copies
  const issuedBooks = books.reduce(
    (acc, book) => acc + (book.issuedTo?.length || 0),
    0
  );

  const totalMembers = members.length;

  return {
    totalBooks,
    availableBooks,
    issuedBooks,
    totalMembers,
  };
};

export default useDashboard;