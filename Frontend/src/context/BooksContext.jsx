import {
  createContext,
  useState,
  useEffect,
} from "react";
// eslint-disable-next-line react-refresh/only-export-components
export const BooksContext = createContext();

const BooksProvider = ({ children }) => {
const [books, setBooks] = useState(() => {
  const savedBooks = localStorage.getItem("books");
  if (savedBooks) return JSON.parse(savedBooks);

  return [
  { id: 1, name: "Atomic Habits", author: "James Clear", category: "Self Help", status: "Available", quantity: 5, issuedTo: [] },
  { id: 2, name: "Rich Dad Poor Dad", author: "Robert Kiyosaki", category: "Finance", status: "Available", quantity: 4, issuedTo: [] },
  { id: 3, name: "The Alchemist", author: "Paulo Coelho", category: "Fiction", status: "Available", quantity: 6, issuedTo: [] },
  { id: 4, name: "Think and Grow Rich", author: "Napoleon Hill", category: "Self Help", status: "Available", quantity: 3, issuedTo: [] },
  { id: 5, name: "Deep Work", author: "Cal Newport", category: "Productivity", status: "Available", quantity: 5, issuedTo: [] },

  { id: 6, name: "Ikigai", author: "Héctor García", category: "Lifestyle", status: "Available", quantity: 4, issuedTo: [] },
  { id: 7, name: "The Power of Habit", author: "Charles Duhigg", category: "Self Help", status: "Available", quantity: 5, issuedTo: [] },
  { id: 8, name: "Sapiens", author: "Yuval Noah Harari", category: "History", status: "Available", quantity: 3, issuedTo: [] },
  { id: 9, name: "Homo Deus", author: "Yuval Noah Harari", category: "History", status: "Available", quantity: 2, issuedTo: [] },
  { id: 10, name: "Clean Code", author: "Robert C. Martin", category: "Programming", status: "Available", quantity: 4, issuedTo: [] },

  { id: 11, name: "The Pragmatic Programmer", author: "Andrew Hunt", category: "Programming", status: "Available", quantity: 3, issuedTo: [] },
  { id: 12, name: "You Don’t Know JS", author: "Kyle Simpson", category: "Programming", status: "Available", quantity: 5, issuedTo: [] },
  { id: 13, name: "Eloquent JavaScript", author: "Marijn Haverbeke", category: "Programming", status: "Available", quantity: 6, issuedTo: [] },
  { id: 14, name: "Cracking the Coding Interview", author: "Gayle Laakmann", category: "Programming", status: "Available", quantity: 3, issuedTo: [] },
  { id: 15, name: "Design Patterns", author: "Gang of Four", category: "Programming", status: "Available", quantity: 2, issuedTo: [] },

  { id: 16, name: "The Psychology of Money", author: "Morgan Housel", category: "Finance", status: "Available", quantity: 5, issuedTo: [] },
  { id: 17, name: "Zero to One", author: "Peter Thiel", category: "Business", status: "Available", quantity: 4, issuedTo: [] },
  { id: 18, name: "Start With Why", author: "Simon Sinek", category: "Business", status: "Available", quantity: 3, issuedTo: [] },
  { id: 19, name: "Good to Great", author: "Jim Collins", category: "Business", status: "Available", quantity: 4, issuedTo: [] },
  { id: 20, name: "Rework", author: "Jason Fried", category: "Business", status: "Available", quantity: 5, issuedTo: [] },

  { id: 21, name: "Harry Potter 1", author: "J.K. Rowling", category: "Fantasy", status: "Available", quantity: 10, issuedTo: [] },
  { id: 22, name: "Harry Potter 2", author: "J.K. Rowling", category: "Fantasy", status: "Available", quantity: 8, issuedTo: [] },
  { id: 23, name: "Harry Potter 3", author: "J.K. Rowling", category: "Fantasy", status: "Available", quantity: 7, issuedTo: [] },
  { id: 24, name: "Lord of the Rings", author: "J.R.R. Tolkien", category: "Fantasy", status: "Available", quantity: 6, issuedTo: [] },
  { id: 25, name: "The Hobbit", author: "J.R.R. Tolkien", category: "Fantasy", status: "Available", quantity: 5, issuedTo: [] },

  { id: 26, name: "Wings of Fire", author: "A.P.J Abdul Kalam", category: "Biography", status: "Available", quantity: 6, issuedTo: [] },
  { id: 27, name: "Steve Jobs", author: "Walter Isaacson", category: "Biography", status: "Available", quantity: 4, issuedTo: [] },
  { id: 28, name: "Elon Musk", author: "Ashlee Vance", category: "Biography", status: "Available", quantity: 3, issuedTo: [] },
  { id: 29, name: "Einstein", author: "Walter Isaacson", category: "Biography", status: "Available", quantity: 2, issuedTo: [] },
  { id: 30, name: "The Diary of a Young Girl", author: "Anne Frank", category: "Biography", status: "Available", quantity: 5, issuedTo: [] },

  { id: 31, name: "The 4-Hour Workweek", author: "Tim Ferriss", category: "Productivity", status: "Available", quantity: 4, issuedTo: [] },
  { id: 32, name: "Make Time", author: "Jake Knapp", category: "Productivity", status: "Available", quantity: 3, issuedTo: [] },
  { id: 33, name: "Can't Hurt Me", author: "David Goggins", category: "Motivation", status: "Available", quantity: 5, issuedTo: [] },
  { id: 34, name: "The Subtle Art", author: "Mark Manson", category: "Self Help", status: "Available", quantity: 6, issuedTo: [] },
  { id: 35, name: "Man’s Search for Meaning", author: "Viktor Frankl", category: "Psychology", status: "Available", quantity: 4, issuedTo: [] },

  { id: 36, name: "Richest Man in Babylon", author: "George Clason", category: "Finance", status: "Available", quantity: 5, issuedTo: [] },
  { id: 37, name: "Bhagavad Gita", author: "Ved Vyas", category: "Spiritual", status: "Available", quantity: 10, issuedTo: [] },
  { id: 38, name: "Ramayana", author: "Valmiki", category: "Spiritual", status: "Available", quantity: 8, issuedTo: [] },
  { id: 39, name: "Mahabharata", author: "Ved Vyas", category: "Spiritual", status: "Available", quantity: 6, issuedTo: [] },
  { id: 40, name: "Thinking Fast and Slow", author: "Daniel Kahneman", category: "Psychology", status: "Available", quantity: 3, issuedTo: [] },

  { id: 41, name: "Digital Minimalism", author: "Cal Newport", category: "Lifestyle", status: "Available", quantity: 4, issuedTo: [] },
  { id: 42, name: "Hooked", author: "Nir Eyal", category: "Business", status: "Available", quantity: 5, issuedTo: [] },
  { id: 43, name: "Influence", author: "Robert Cialdini", category: "Psychology", status: "Available", quantity: 3, issuedTo: [] },
  { id: 44, name: "Blink", author: "Malcolm Gladwell", category: "Psychology", status: "Available", quantity: 4, issuedTo: [] },
  { id: 45, name: "Outliers", author: "Malcolm Gladwell", category: "Psychology", status: "Available", quantity: 5, issuedTo: [] },

  { id: 46, name: "The Lean Startup", author: "Eric Ries", category: "Business", status: "Available", quantity: 6, issuedTo: [] },
  { id: 47, name: "No Rules Rules", author: "Reed Hastings", category: "Business", status: "Available", quantity: 4, issuedTo: [] },
  { id: 48, name: "The One Thing", author: "Gary Keller", category: "Productivity", status: "Available", quantity: 5, issuedTo: [] },
  { id: 49, name: "Essentialism", author: "Greg McKeown", category: "Productivity", status: "Available", quantity: 3, issuedTo: [] },
  { id: 50, name: "Grit", author: "Angela Duckworth", category: "Psychology", status: "Available", quantity: 4, issuedTo: [] },
  ];
});

  // ➕ Add Book
const addBook = (book) => {
  const newBook = {
    id: Date.now(),
    ...book,
    status: "Available",
    quantity: Number(book.quantity) || 1,
    issuedTo: [],
  };

  setBooks((prev) => [...prev, newBook]);
};

  // ❌ Delete Book
  const deleteBook = (id) => {
    setBooks((prev) => prev.filter((book) => book.id !== id));
  };

  // ✏️ Update Book
const updateBook = (updatedBook) => {
  setBooks((prev) =>
    prev.map((book) =>
      book.id === updatedBook.id
        ? {
            ...book,
            ...updatedBook,
            issuedTo: book.issuedTo, // preserve
          }
        : book
    )
  );
};
  // 📚 Issue Book
const issueBook = (bookId, memberName) => {
  const date = new Date().toLocaleDateString("en-IN");

  const time = new Date().toLocaleTimeString(
    "en-IN",
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  setBooks((prev) =>
    prev.map((book) =>
      book.id === bookId
        ? {
            ...book,
            quantity: (book.quantity ?? 0) - 1,
            issuedTo: [
              ...(book.issuedTo ?? []),
              {
                memberName,
                date,
                time,
              },
            ],
          }
        : book
    )
  );
};

  // 🔁 Return Book
const returnBook = (bookId, memberName) => {
  setBooks((prev) =>
    prev.map((book) => {
      if (book.id !== bookId) return book;

      const index = book.issuedTo.findIndex(
        (i) => i.memberName === memberName
      );

      if (index === -1) return book;

      const updatedIssued = [...book.issuedTo];
      updatedIssued.splice(index, 1);

      return {
        ...book,
        quantity: book.quantity + 1,
        issuedTo: updatedIssued,
      };
    })
  );
};
useEffect(() => {
  localStorage.setItem(
    "books",
    JSON.stringify(books)
  );
}, [books]);
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
