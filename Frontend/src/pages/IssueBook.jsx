import { useMemo, useState } from "react";
import { BookOpenCheck, CalendarDays, CheckCircle2, Clock3, SearchX, Send, UserRound, XCircle } from "lucide-react";
import useBooks from "../hooks/useBooks";
import useMembers from "../hooks/useMembers";
import "./IssueBook.css";

const IssueBook = () => {
  const { books = [], issueBook } = useBooks();
  const { members = [] } = useMembers();
  const [selectedBook, setSelectedBook] = useState("");
  const [selectedMember, setSelectedMember] = useState("");
  const [notification, setNotification] = useState(null);

  const availableBooks = useMemo(() => books.filter((book) => (book.quantity ?? 0) > 0), [books]);
  const issueRecords = books.flatMap((book) =>
    (book.issuedTo || []).map((issue, index) => ({
      id: `${book.id}-${index}`,
      bookName: book.name,
      category: book.category,
      ...issue,
    }))
  );

  const showToast = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 2600);
  };

  const handleIssue = (event) => {
    event.preventDefault();

    if (!selectedBook || !selectedMember) {
      showToast("error", "Select both a book and a member.");
      return;
    }

    const member = members.find((item) => item.id === Number(selectedMember));
    const book = books.find((item) => item.id === Number(selectedBook));

    if (!member || !book) {
      showToast("error", "The selected record is no longer available.");
      return;
    }

    if ((book.quantity ?? 0) <= 0) {
      showToast("error", "This book is currently unavailable.");
      return;
    }

    issueBook(Number(selectedBook), member.name);
    showToast("success", `${book.name} issued to ${member.name}.`);
    setSelectedBook("");
    setSelectedMember("");
  };

  return (
    <div className="issue-book-page page-shell">
      <header className="page-header">
        <div>
          <span className="page-kicker"><BookOpenCheck size={14} /> Circulation</span>
          <h1>Issue Book</h1>
          <p className="page-subtitle">Create a lending record with clear availability and member selection.</p>
        </div>
      </header>

      {notification && (
        <div className={`toast toast-${notification.type}`}>
          {notification.type === "success" ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
          {notification.message}
        </div>
      )}

      <section className="issue-layout">
        <form className="glass-card panel issue-form" onSubmit={handleIssue}>
          <div className="section-heading">
            <div>
              <h2>New issue record</h2>
              <p>Select a title and assign it to a registered member.</p>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="book-select">Book</label>
            <select id="book-select" value={selectedBook} onChange={(event) => setSelectedBook(event.target.value)}>
              <option value="">Choose an available book</option>
              {availableBooks.map((book) => (
                <option key={book.id} value={book.id}>
                  {book.name} - {book.quantity ?? 0} copies available
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="member-select">Member</label>
            <select id="member-select" value={selectedMember} onChange={(event) => setSelectedMember(event.target.value)}>
              <option value="">Choose a member</option>
              {members.map((member) => (
                <option key={member.id} value={member.id}>{member.name}</option>
              ))}
            </select>
          </div>

          <button className="btn-primary" type="submit"><Send size={18} /> Issue Book</button>
        </form>

        <aside className="glass-card panel circulation-summary">
          <h2>Today’s desk</h2>
          <div className="summary-card">
            <BookOpenCheck size={22} />
            <div>
              <strong>{availableBooks.length}</strong>
              <p>Titles available</p>
            </div>
          </div>
          <div className="summary-card">
            <UserRound size={22} />
            <div>
              <strong>{members.length}</strong>
              <p>Registered members</p>
            </div>
          </div>
        </aside>
      </section>

      <section className="glass-card panel">
        <div className="section-heading">
          <div>
            <h2>Issued books history</h2>
            <p>Timestamped circulation records for active loans.</p>
          </div>
          <span className="badge badge-primary">{issueRecords.length} records</span>
        </div>

        {issueRecords.length > 0 ? (
          <div className="table-scroll">
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
                {issueRecords.slice().reverse().map((record) => (
                  <tr key={record.id}>
                    <td>
                      <strong>{record.bookName}</strong>
                      <span>{record.category}</span>
                    </td>
                    <td>{record.memberName}</td>
                    <td><span className="badge badge-primary"><CalendarDays size={14} /> {record.date}</span></td>
                    <td><span className="badge badge-warning"><Clock3 size={14} /> {record.time}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-illustration"><SearchX size={34} /></div>
            <strong>No issued records yet</strong>
            <p>Issue a book to start building circulation history.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default IssueBook;
