import "./BooksHeader.css";

const BooksHeader = ({ search, setSearch }) => {
  return (
    <div className="books-header">
      <input
        type="text"
        placeholder="Search book..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button>Add Book</button>
    </div>
  );
};

export default BooksHeader;