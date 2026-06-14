import { useState } from "react";
import { Save } from "lucide-react";

const EditBookForm = ({ editingBook, updateBook, closeModal }) => {
  const [form, setForm] = useState(() => ({
    name: editingBook?.name || "",
    author: editingBook?.author || "",
    category: editingBook?.category || "",
    quantity: editingBook?.quantity || "",
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!editingBook) return;

    updateBook({
      ...editingBook,
      ...form,
      quantity: Number(form.quantity),
    });
  };

  return (
    <form className="form-grid" onSubmit={handleSubmit}>
      <div>
        <span className="page-kicker">Catalog Editor</span>
        <h2>Edit book details</h2>
      </div>

      <div className="form-grid two">
        <div className="form-group">
          <label htmlFor="edit-book-name">Book name</label>
          <input id="edit-book-name" name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="edit-book-author">Author</label>
          <input id="edit-book-author" name="author" value={form.author} onChange={handleChange} required />
        </div>
      </div>

      <div className="form-grid two">
        <div className="form-group">
          <label htmlFor="edit-book-category">Category</label>
          <input id="edit-book-category" name="category" value={form.category} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="edit-book-quantity">Quantity</label>
          <input id="edit-book-quantity" type="number" min="0" name="quantity" value={form.quantity} onChange={handleChange} required />
        </div>
      </div>

      <div className="modal-actions">
        <button className="btn-secondary" type="button" onClick={closeModal}>Cancel</button>
        <button className="btn-primary" type="submit"><Save size={17} /> Save changes</button>
      </div>
    </form>
  );
};

export default EditBookForm;
