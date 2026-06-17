import { useMemo, useState } from "react";
import { BookOpen, Search } from "lucide-react";
import useBooks from "../hooks/useBooks";
import DataTable from "../components/DataTable/DataTable";
import "./Books.css";

const PAGE_SIZE = 8;

const StudentBooks = () => {
  const { books = [] } = useBooks();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);

  const categories = useMemo(
    () => [
      "All",
      ...new Set(
        books.map((book) => book.category).filter(Boolean)
      ),
    ],
    [books]
  );

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const query = search.toLowerCase();

      const matchesSearch =
        (book.name || "")
          .toLowerCase()
          .includes(query) ||
        (book.author || "")
          .toLowerCase()
          .includes(query) ||
        (book.category || "")
          .toLowerCase()
          .includes(query);

      const matchesCategory =
        category === "All" ||
        book.category === category;

      return (
        matchesSearch &&
        matchesCategory
      );
    });
  }, [books, search, category]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredBooks.length / PAGE_SIZE)
  );

  const visibleBooks = filteredBooks.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const columns = [
    { key: "name", label: "Title" },
    { key: "category", label: "Category" },
    { key: "status", label: "Status" },
  ];

  return (
    <div className="books-page page-shell">
      <header className="page-header">
        <div>
          <span className="page-kicker">
            <BookOpen size={14} /> Library
          </span>

          <h1>Browse Books</h1>

          <p className="page-subtitle">
            Explore books available in the library.
          </p>
        </div>
      </header>

      <section className="glass-card panel">
        <div className="toolbar">
          <div className="search-field">
            <Search size={18} />

            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search books..."
            />
          </div>

          <div className="filter-row">
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
            >
              {categories.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>

            <span className="badge badge-primary">
              {filteredBooks.length} books
            </span>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={visibleBooks}
          renderCell={(book, col) => {
            if (col.key === "name") {
              return (
                <div className="table-title-cell">
                  <span className="table-icon">
                    <BookOpen size={18} />
                  </span>

                  <div>
                    <strong>{book.name}</strong>
                    <span>{book.author}</span>
                  </div>
                </div>
              );
            }

            if (col.key === "status") {
              const available =
                (book.quantity ?? 0) > 0;

              return (
                <span
                  className={`badge ${
                    available
                      ? "badge-success"
                      : "badge-danger"
                  }`}
                >
                  {available
                    ? "Available"
                    : "Unavailable"}
                </span>
              );
            }

            return (
              book[col.key] || "-"
            );
          }}
        />

        <div className="pagination">
          <span>
            Page {page} of {totalPages}
          </span>

          <div className="pagination-actions">
            <button
              className="btn-secondary btn-sm"
              disabled={page === 1}
              onClick={() =>
                setPage((p) => p - 1)
              }
            >
              Previous
            </button>

            <button
              className="btn-secondary btn-sm"
              disabled={
                page === totalPages
              }
              onClick={() =>
                setPage((p) => p + 1)
              }
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudentBooks;