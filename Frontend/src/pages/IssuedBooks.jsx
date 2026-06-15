import { BookOpenCheck, RotateCcw, SearchX } from "lucide-react";
import useBooks from "../hooks/useBooks";

const IssuedBooks = () => {
  const { books = [], returnBook } = useBooks();
  const records = books.flatMap((book) =>
    (book.issuedTo || []).map((issue, index) => ({
      id: `${book.id}-${index}`,
      bookId: book.id,
      bookName: book.name,
      category: book.category,
      ...issue,
    }))
  );

  return (
    <div className="page-shell">
      <header className="page-header">
        <div>
          <span className="page-kicker"><BookOpenCheck size={14} /> Active Loans</span>
          <h1>Issued Books</h1>
          <p className="page-subtitle">A focused view of every active lending record.</p>
        </div>
      </header>

      <section className="glass-card panel">
        {records.length > 0 ? (
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Book</th>
                  <th>Member</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr key={record.id}>
                    <td>{record.bookName}</td>
                    <td>{record.memberName}</td>
                    <td>{record.date}</td>
                    <td>
                      <button className="btn-success btn-sm" onClick={() => returnBook(record.bookId, record.memberName)}>
                        <RotateCcw size={15} /> Return
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-illustration"><SearchX size={34} /></div>
            <strong>No active loans</strong>
            <p>Issued books will appear here.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default IssuedBooks;
