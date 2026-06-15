import "./BookTable.css";

const BookTable = ({ books, onDelete, onEdit }) => {
  return (
    <table className="book-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Book Name</th>
          <th>Author</th>
          <th>Category</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {books.map((book) => (
          <tr key={book.id}>
            <td>{book.id}</td>
            <td>{book.name}</td>
            <td>{book.author}</td>
            <td>{book.category}</td>
            <td>{book.status}</td>

            <td>
              <button  onClick={() => onEdit(book)}>Edit</button>

              <button
                onClick={() => onDelete(book.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BookTable;