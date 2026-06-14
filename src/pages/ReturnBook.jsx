import { useMemo, useState } from "react";
import { CheckCircle2, RotateCcw, SearchX, ShieldCheck, Undo2, XCircle } from "lucide-react";
import useBooks from "../hooks/useBooks";
import "./ReturnBook.css";

const ReturnBook = () => {
  const { books = [], returnBook } = useBooks();
  const [notification, setNotification] = useState(null);
  const [pendingReturn, setPendingReturn] = useState(null);

  const issuedRecords = useMemo(
    () =>
      books.flatMap((book) =>
        (book.issuedTo || []).map((issue, index) => ({
          id: `${book.id}-${index}`,
          bookId: book.id,
          bookName: book.name,
          category: book.category,
          ...issue,
        }))
      ),
    [books]
  );

  const showToast = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 2600);
  };

  const confirmReturn = () => {
    if (!pendingReturn) return;
    returnBook(pendingReturn.bookId, pendingReturn.memberName);
    showToast("success", `${pendingReturn.bookName} returned successfully.`);
    setPendingReturn(null);
  };

  return (
    <div className="return-book-page page-shell">
      <header className="page-header">
        <div>
          <span className="page-kicker"><RotateCcw size={14} /> Returns</span>
          <h1>Return Books</h1>
          <p className="page-subtitle">Process active loans with clear confirmation and inventory status updates.</p>
        </div>
        <span className="badge badge-primary">{issuedRecords.length} active loans</span>
      </header>

      {notification && (
        <div className={`toast toast-${notification.type}`}>
          {notification.type === "success" ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
          {notification.message}
        </div>
      )}

      <section className="glass-card panel">
        {issuedRecords.length > 0 ? (
          <div className="table-scroll">
            <table className="return-table">
              <thead>
                <tr>
                  <th>Book</th>
                  <th>Member</th>
                  <th>Issue Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {issuedRecords.map((record) => (
                  <tr key={record.id}>
                    <td>
                      <strong>{record.bookName}</strong>
                      <span>{record.category}</span>
                    </td>
                    <td>{record.memberName}</td>
                    <td>{record.date}</td>
                    <td><span className="badge badge-warning">On loan</span></td>
                    <td>
                      <button className="btn-success btn-sm" onClick={() => setPendingReturn(record)}>
                        <Undo2 size={15} /> Return
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
            <strong>No books are currently issued</strong>
            <p>Return actions will appear here once members borrow books.</p>
          </div>
        )}
      </section>

      {pendingReturn && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal confirm-modal">
            <span className="confirm-icon"><ShieldCheck size={26} /></span>
            <h2>Confirm return</h2>
            <p>Mark <strong>{pendingReturn.bookName}</strong> as returned from {pendingReturn.memberName}?</p>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setPendingReturn(null)}>Cancel</button>
              <button className="btn-success" onClick={confirmReturn}><RotateCcw size={17} /> Confirm return</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReturnBook;
