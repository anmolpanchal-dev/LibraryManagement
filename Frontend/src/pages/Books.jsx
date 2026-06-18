import { useMemo, useState } from "react";
import { BookOpen, CheckCircle2, Edit3, Plus, Search, Trash2, XCircle } from "lucide-react";
import useBooks from "../hooks/useBooks";
import AddBookForm from "../components/AddBookForm/AddBookForm";
import EditBookModal from "../components/Navbar/EditBookModal/EditBookModal";
import DataTable from "../components/DataTable/DataTable";
import "./Books.css";

const PAGE_SIZE = 8;

const Books = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [notification, setNotification] = useState(null);
  const { books = [], addBook, deleteBook, updateBook } = useBooks();

  const categories = useMemo(
    () => ["All", ...new Set(books.map((book) => book.category).filter(Boolean))],
    [books]
  );

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const query = search.toLowerCase();
      const matchesSearch =
        (book.name || "").toLowerCase().includes(query) ||
        (book.author || "").toLowerCase().includes(query) ||
        (book.category || "").toLowerCase().includes(query);
      const matchesCategory = category === "All" || book.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [books, category, search]);

  const totalPages = Math.max(1, Math.ceil(filteredBooks.length / PAGE_SIZE));
  const visibleBooks = filteredBooks.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const showToast = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 2600);
  };

  const handleAddBook = (bookData) => {
    addBook(bookData);
    showToast("success", "Book added to the catalog.");
  };

  const handleDeleteBook = (id) => {
  console.log("Delete ID:", id);

  deleteBook(id);
  showToast("success", "Book removed from the catalog.");
};

const handleUpdateBook = (updatedBook) => {
  console.log("Updated Book:", updatedBook);

  updateBook(updatedBook);
  setEditingBook(null);
  showToast("success", "Book details updated.");
};

  const columns = [
    { key: "name", label: "Title" },
    { key: "category", label: "Category" },
    { key: "quantity", label: "Quantity" },
    { key: "status", label: "Status" },
  ];

  return (
    <div className="books-page page-shell">
      <header className="page-header">
        <div>
          <span className="page-kicker"><BookOpen size={14} /> Catalog</span>
          <h1>Books Management</h1>
          <p className="page-subtitle">Search, curate, and maintain an enterprise-ready library catalog.</p>
        </div>
        <button className="btn-primary" onClick={() => setShowAddModal(true)}>
          <Plus size={18} /> Add Book
        </button>
      </header>

      {notification && (
        <div className={`toast toast-${notification.type}`}>
          {notification.type === "success" ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
          {notification.message}
        </div>
      )}

      <section className="glass-card panel">
        <div className="toolbar">
          <div className="search-field">
            <Search size={18} />
            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Search by title, author, or category"
            />
          </div>

          <div className="filter-row">
            <select
              aria-label="Filter by category"
              value={category}
              onChange={(event) => {
                setCategory(event.target.value);
                setPage(1);
              }}
            >
              {categories.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
            <span className="badge badge-primary">{filteredBooks.length} books</span>
          </div>
        </div>

        {filteredBooks.length > 0 ? (
          <>
            <DataTable
              columns={columns}
              data={visibleBooks}
              renderCell={(book, col) => {
                if (col.key === "name") {
                  return (
                    <div className="table-title-cell">
                      <span className="table-icon"><BookOpen size={18} /></span>
                      <div>
                        <strong>{book.name}</strong>
                        <span>{book.author}</span>
                      </div>
                    </div>
                  );
                }

                if (col.key === "quantity") {
                  return <span className="badge badge-primary">{book.quantity ?? 0} copies</span>;
                }

                if (col.key === "status") {
                  const available = (book.quantity ?? 0) > 0;
                  return <span className={`badge ${available ? "badge-success" : "badge-danger"}`}>{available ? "Available" : "Unavailable"}</span>;
                }

                return book[col.key] || "-";
              }}
              renderActions={(book) => (
                <div className="action-buttons">
                  <button className="btn-secondary btn-sm" onClick={() => setEditingBook(book)}>
                    <Edit3 size={15} /> Edit
                  </button>
                  <button className="btn-danger btn-sm" onClick={() => handleDeleteBook(book._id)}>
                    <Trash2 size={15} /> Delete
                  </button>
                </div>
              )}
            />

            <div className="pagination">
              <span>Page {page} of {totalPages}</span>
              <div className="pagination-actions">
                <button className="btn-secondary btn-sm" disabled={page === 1} onClick={() => setPage((value) => value - 1)}>Previous</button>
                <button className="btn-secondary btn-sm" disabled={page === totalPages} onClick={() => setPage((value) => value + 1)}>Next</button>
              </div>
            </div>
          </>
        ) : (
          <div className="empty-state">
            <div className="empty-illustration"><BookOpen size={34} /></div>
            <strong>No books found</strong>
            <p>Adjust your search or add a new title to the catalog.</p>
          </div>
        )}
      </section>

      {showAddModal && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal">
            <AddBookForm onAddBook={handleAddBook} onDone={() => setShowAddModal(false)} />
            <button className="btn-secondary modal-close" onClick={() => setShowAddModal(false)}>Close</button>
          </div>
        </div>
      )}

      <EditBookModal editingBook={editingBook} updateBook={handleUpdateBook} closeModal={() => setEditingBook(null)} />
    </div>
  );
};

export default Books;
