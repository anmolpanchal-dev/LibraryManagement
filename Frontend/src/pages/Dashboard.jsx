import { useMemo } from "react";
import {
  Activity,
  ArrowUpRight,
  BookCopy,
  BookOpenCheck,
  Clock3,
  LibraryBig,
  Sparkles,
  UsersRound,
} from "lucide-react";
import useBooks from "../hooks/useBooks";
import useDashboard from "../hooks/useDashboard";
import StatCard from "../components/StatCard/StatCard";
import "./Dashboard.css";

const Dashboard = () => {
  const { books = [] } = useBooks();
  const { totalBooks, availableBooks, issuedBooks, totalMembers } =
    useDashboard();

  const issueRecords = books.flatMap((book) =>
    (book.issuedTo || []).map((issue) => ({
      ...issue,
      bookName: book.name,
      category: book.category,
    })),
  );

  // 📊 Analytics

  const mostIssuedBook = useMemo(() => {
    const data = books.map((book) => ({
      name: book.name,
      count: book.issuedTo?.length || 0,
    }));

    return data.sort((a, b) => b.count - a.count)[0];
  }, [books]);

  const mostActiveMember = useMemo(() => {
    const members = {};

    books.forEach((book) => {
      book.issuedTo?.forEach((issue) => {
        members[issue.memberName] = (members[issue.memberName] || 0) + 1;
      });
    });

    const result = Object.entries(members).sort((a, b) => b[1] - a[1])[0];

    return result
      ? {
          name: result[0],
          count: result[1],
        }
      : null;
  }, [books]);

  const topCategories = useMemo(() => {
    const data = {};

    books.forEach((book) => {
      if (book.category) {
        data[book.category] = (data[book.category] || 0) + 1;
      }
    });

    return Object.entries(data)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  }, [books]);
  const lowStock = books
    .filter((book) => (book.quantity || 0) <= 2)
    .slice(0, 5);
  const categories = [
    ...new Set(books.map((book) => book.category).filter(Boolean)),
  ].slice(0, 6);
  const availabilityRate = totalBooks
    ? Math.round((availableBooks / totalBooks) * 100)
    : 0;

  const stats = [
    {
      id: "total",
      count: totalBooks,
      title: "Total Books",
      description: "All copies across the catalog",
      icon: LibraryBig,
      trend: "+12% this term",
      tone: "primary",
    },
    {
      id: "available",
      count: availableBooks,
      title: "Available Books",
      description: "Ready for members to borrow",
      icon: BookOpenCheck,
      trend: `${availabilityRate}% available`,
      tone: "success",
    },
    {
      id: "issued",
      count: issuedBooks,
      title: "Issued Books",
      description: "Currently checked out",
      icon: BookCopy,
      trend: `${issueRecords.length} active`,
      tone: "warning",
    },
    {
      id: "members",
      count: totalMembers,
      title: "Total Members",
      description: "Students, faculty, and staff",
      icon: UsersRound,
      trend: "+8 new",
      tone: "danger",
    },
  ];

  return (
    <div className="dashboard page-shell">
      <header className="page-header dashboard-hero">
        <div>
          <span className="page-kicker">
            <Sparkles size={14} /> Library Command Center
          </span>
          <h1>Circulation intelligence for modern institutions.</h1>
          <p className="page-subtitle">
            Monitor inventory health, member activity, and lending operations
            from a calm, enterprise-grade workspace.
          </p>
        </div>
        <div className="hero-metric glass-card">
          <span>Availability</span>
          <strong>{availabilityRate}%</strong>
          <small>Live catalog capacity</small>
        </div>
      </header>

      <section className="stats-grid" aria-label="Library statistics">
        {stats.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}
      </section>

      <section className="dashboard-grid">
        <div className="glass-card panel">
          <div className="section-heading">
            <div>
              <h2>Recent Activity</h2>
              <p>Latest book issue records across the library.</p>
            </div>
            <span className="badge badge-primary">
              <Activity size={14} /> Live
            </span>
          </div>

          <div className="activity-list">
            {issueRecords.length > 0 ? (
              issueRecords
                .slice(-6)
                .reverse()
                .map((record, index) => (
                  <article
                    key={`${record.bookName}-${record.memberName}-${index}`}
                    className="activity-item"
                  >
                    <span className="activity-icon">
                      <BookOpenCheck size={18} />
                    </span>
                    <div>
                      <strong>{record.bookName}</strong>
                      <p>Issued to {record.memberName}</p>
                    </div>
                    <span className="time-chip">
                      <Clock3 size={13} /> {record.date} {record.time}
                    </span>
                  </article>
                ))
            ) : (
              <div className="empty-state compact-empty">
                <div className="empty-illustration">
                  <BookOpenCheck size={34} />
                </div>
                <strong>No circulation yet</strong>
                <p>Issued books will appear here with timestamps.</p>
              </div>
            )}
          </div>
        </div>

        <div className="glass-card panel">
          <div className="section-heading">
            <div>
              <h2>Collection Mix</h2>
              <p>Top catalog categories for quick planning.</p>
            </div>
          </div>

          <div className="category-cloud">
            {categories.map((category) => {
              const count = books.filter(
                (book) => book.category === category,
              ).length;
              return (
                <span className="category-pill" key={category}>
                  {category}
                  <strong>{count}</strong>
                </span>
              );
            })}
          </div>

          <div className="low-stock">
            <h3>Low Stock Watch</h3>
            {lowStock.length > 0 ? (
              lowStock.map((book) => (
                <div key={book._id} className="stock-row">
                  <span>{book.name}</span>
                  <span className="badge badge-warning">
                    {book.quantity} left
                  </span>
                </div>
              ))
            ) : (
              <p>All tracked books have healthy availability.</p>
            )}
          </div>
        </div>

        <div className="glass-card panel wide-panel">
          <div className="section-heading">
            <div>
              <h2>Operational Overview</h2>
              <p>Quick signals for campus library teams.</p>
            </div>
            <button className="btn-secondary btn-sm">
              View report <ArrowUpRight size={15} />
            </button>
          </div>
          <div className="overview-strip">
            <div>
              <span className="skeleton overview-spark" />
              <strong>{books.length}</strong>
              <p>Unique titles managed</p>
            </div>
            <div>
              <span className="skeleton overview-spark" />
              <strong>{categories.length}</strong>
              <p>Active departments</p>
            </div>
            <div>
              <span className="skeleton overview-spark" />
              <strong>{new Date().toLocaleDateString("en-IN")}</strong>
              <p>Last system sync</p>
            </div>
          </div>
<div className="analytics-content">


  <div className="analytics-left">

    <div className="analytics-card">
      <h3>Most Issued Book</h3>

      <strong>
        {mostIssuedBook?.name || "No data"}
      </strong>

      <p>
        {mostIssuedBook?.count || 0} issues
      </p>
    </div>


    <div className="analytics-card">

      <h3>Most Active Member</h3>

      <strong>
        {mostActiveMember?.name || "No data"}
      </strong>

      <p>
        {mostActiveMember?.count || 0} borrowed
      </p>

    </div>


  </div>



  <div className="analytics-card analytics-category">

    <h3>Top Categories</h3>

    {topCategories.map(([cat,count])=>(
      <p key={cat}>
        {cat} : {count}
      </p>
    ))}

  </div>


</div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
