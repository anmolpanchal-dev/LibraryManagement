import { useMemo, useState } from "react";
import {
  BookOpenCheck,
  CalendarDays,
  CheckCircle2,
  Clock3,
  SearchX,
  Send,
  UserRound,
  XCircle,
} from "lucide-react";

import useBooks from "../hooks/useBooks";
import useMembers from "../hooks/useMembers";
import "./IssueBook.css";

const IssueBook = () => {
  const { books = [], issueBook } = useBooks();
  const { members = [] } = useMembers();

  const [studentId, setStudentId] = useState("");
  const [bookId, setBookId] = useState("");

  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);

  const [notification, setNotification] = useState(null);

  const availableBooks = useMemo(
    () => books.filter((book) => (book.quantity ?? 0) > 0),
    [books],
  );

  const issueRecords = books.flatMap((book) =>
    (book.issuedTo || []).map((issue, index) => ({
      id: `${book._id}-${index}`,
      bookName: book.name,
      category: book.category,
      ...issue,
    })),
  );

  const showToast = (type, message) => {
    setNotification({
      type,
      message,
    });

    setTimeout(() => setNotification(null), 2600);
  };

  // Student search by LIB ID

  const searchStudent = () => {
    const member = members.find((item) => item.studentId === studentId);

    if (!member) {
      showToast("error", "Student not found");

      return;
    }

    setSelectedMember(member);

    showToast("success", `${member.name} selected`);
  };

  // Book select

  const selectBook = (id) => {
    const book = books.find((item) => item._id === id);

    if (!book) {
      showToast("error", "Book not found");

      return;
    }

    setSelectedBook(book);
  };

  const handleIssue = (event) => {
    event.preventDefault();

    if (!selectedMember) {
      showToast("error", "Select student first");

      return;
    }

    if (!selectedBook) {
      showToast("error", "Select book first");

      return;
    }

    if ((selectedBook.quantity ?? 0) <= 0) {
      showToast("error", "Book unavailable");

      return;
    }

    issueBook(selectedBook._id, selectedMember, bookId || null);

    showToast(
      "success",
      `${selectedBook.name} issued to ${selectedMember.name}`,
    );

    setStudentId("");
    setBookId("");

    setSelectedBook(null);
    setSelectedMember(null);
  };

  return (
    <div className="issue-book-page page-shell">
      <header className="page-header">
        <div>
          <span className="page-kicker">
            <BookOpenCheck size={14} />
            Circulation
          </span>

          <h1>Issue Book</h1>

          <p className="page-subtitle">Create lending record</p>
        </div>
      </header>

      {notification && (
        <div className={`toast toast-${notification.type}`}>
          {notification.type === "success" ? (
            <CheckCircle2 size={18} />
          ) : (
            <XCircle size={18} />
          )}

          {notification.message}
        </div>
      )}

      <section className="issue-layout">
        <form className="glass-card panel issue-form" onSubmit={handleIssue}>
          <div className="section-heading">
            <h2>New Issue Record</h2>
          </div>

          {/* STUDENT */}

          <div className="form-group">
            <label>Student ID</label>

            <div className="search-box">
              <input
                type="text"
                placeholder="LIB1001"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
              />

              <button type="button" onClick={searchStudent}>
                Search
              </button>
            </div>

            {selectedMember && (
              <p>
                Selected Student:
                <strong>{selectedMember.name}</strong>
              </p>
            )}
          </div>

          {/* BOOK SELECT */}

          <div className="form-group">
            <label>Select Book</label>

            <select
              value={selectedBook?._id || ""}
              onChange={(e) => selectBook(e.target.value)}
            >
              <option value="">Choose book</option>

              {availableBooks.map((book) => (
                <option key={book._id} value={book._id}>
                  {book.name}
                </option>
              ))}
            </select>

            {selectedBook && (
              <p>
                Selected Book:
                <strong>{selectedBook.name}</strong>
              </p>
            )}
          </div>

          {/* OPTIONAL BOOK ID */}

          <div className="form-group">
            <label>Book ID (Optional)</label>

            <input
              type="text"
              placeholder="BK1001"
              value={bookId}
              onChange={(e) => setBookId(e.target.value)}
            />
          </div>

          <button className="btn-primary" type="submit">
            <Send size={18} />
            Issue Book
          </button>
        </form>

        <aside className="glass-card panel circulation-summary">
          <h2>Today's Desk</h2>

          <div className="summary-card">
            <BookOpenCheck size={22} />

            <div>
              <strong>{availableBooks.length}</strong>

              <p>Available Books</p>
            </div>
          </div>

          <div className="summary-card">
            <UserRound size={22} />

            <div>
              <strong>{members.length}</strong>

              <p>Members</p>
            </div>
          </div>
        </aside>
      </section>

{/* ... Baaki ka upar ka code bilkul same rahega ... */}

<section className="glass-card panel">
  <div className="section-heading">
    <h2>Issued History</h2>
    <span className="badge badge-primary">{issueRecords.length}</span>
  </div>

  {issueRecords.length > 0 ? (
    <div className="table-wrapper"> {/* Class name changed from table-scroll to table-wrapper */}
      <table className="issue-table">
        <thead>
          <tr>
            <th>Book</th>
            <th>Member</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>

        <tbody>
          {issueRecords.reverse().map((record) => (
            <tr key={record.id}>
              {/* Added data-label and td-content wrapper */}
              <td data-label="Book" className="book-title-cell-override">
                <div className="td-content row-title-group">
                  <strong>{record.bookName}</strong>
                  <span>{record.category}</span>
                </div>
              </td>

              <td data-label="Member">
                <div className="td-content">
                  {record.memberName}
                </div>
              </td>

              <td data-label="Date">
                <div className="td-content datetime-inline">
                  <CalendarDays size={14} />
                  {record.date}
                </div>
              </td>

              <td data-label="Time">
                <div className="td-content datetime-inline">
                  <Clock3 size={14} />
                  {record.time}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <div className="empty-state">
      <div className="empty-illustration">
        <SearchX size={34} />
      </div>
      <strong>No issued records yet</strong>
      <p>Issue a book to start history</p>
    </div>
  )}
</section>

{/* ... Baaki ka niche ka code same rahega ... */}
    </div>
  );
};

export default IssueBook;
