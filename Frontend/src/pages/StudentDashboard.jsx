import { BookOpen, User, Clock, Library } from "lucide-react";
import useAuth from "../hooks/useAuth";
import useBooks from "../hooks/useBooks";
// import "./StudentDashboard.css";

const StudentDashboard = () => {
  const { user } = useAuth();
  const { books } = useBooks();

  const myBooks = books.filter((book) =>
    book.issuedTo?.some(
      (issue) =>
        issue.memberEmail === user?.email ||
        issue.memberName === user?.name
    )
  );

  return (
    <div className="student-dashboard page-shell">
      <header className="page-header">
        <div>
          <span className="page-kicker">
            <User size={14} /> Student Portal
          </span>

          <h1>Welcome, {user?.name}</h1>

          <p className="page-subtitle">
            Track your issued books and library activity.
          </p>
        </div>
      </header>

      <section className="stats-grid">
        <div className="glass-card stat-card">
          <Library size={24} />
          <h3>{myBooks.length}</h3>
          <p>Books Issued</p>
        </div>

        <div className="glass-card stat-card">
          <BookOpen size={24} />
          <h3>{myBooks.length}</h3>
          <p>Currently Reading</p>
        </div>

        <div className="glass-card stat-card">
          <Clock size={24} />
          <h3>Active</h3>
          <p>Library Status</p>
        </div>
      </section>

      <section className="glass-card panel">
        <div className="section-heading">
          <h2>My Books</h2>
        </div>

        {myBooks.length > 0 ? (
          <div className="table-scroll">
            <table className="issue-table">
              <thead>
                <tr>
                  <th>Book</th>
                  <th>Author</th>
                  <th>Category</th>
                </tr>
              </thead>

              <tbody>
                {myBooks.map((book) => (
                  <tr key={book._id}>
                    <td>{book.name}</td>
                    <td>{book.author}</td>
                    <td>{book.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <strong>No Books Issued</strong>
            <p>You currently have no active book loans.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default StudentDashboard;