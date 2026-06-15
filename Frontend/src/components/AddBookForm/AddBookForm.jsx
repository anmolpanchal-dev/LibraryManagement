import { useState } from "react";
import { BookPlus } from "lucide-react";
import "./AddBookForm.css";

const initialForm = {
  name: "",
  author: "",
  category: "",
  quantity: "1",
};

const AddBookForm = ({ onAddBook, onDone }) => {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Book name is required";
    if (!formData.author.trim()) newErrors.author = "Author name is required";
    if (!formData.category.trim()) newErrors.category = "Category is required";
    if (!formData.quantity || Number(formData.quantity) < 1) {
      newErrors.quantity = "Quantity must be at least 1";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onAddBook({ ...formData, quantity: Number(formData.quantity) });
    setFormData(initialForm);
    setErrors({});
    onDone?.();
  };

  return (
    <form className="add-book-form form-grid" onSubmit={handleSubmit}>
      <div>
        <span className="page-kicker"><BookPlus size={14} /> New Book</span>
        <h2>Add catalog item</h2>
      </div>

      <div className="form-grid two">
        <div className="form-group">
          <label htmlFor="book-name">Book name</label>
          <input id="book-name" className={errors.name ? "input-error" : ""} name="name" value={formData.name} onChange={handleChange} placeholder="Atomic Habits" />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="book-author">Author</label>
          <input id="book-author" className={errors.author ? "input-error" : ""} name="author" value={formData.author} onChange={handleChange} placeholder="James Clear" />
          {errors.author && <span className="error-message">{errors.author}</span>}
        </div>
      </div>

      <div className="form-grid two">
        <div className="form-group">
          <label htmlFor="book-category">Category</label>
          <input id="book-category" className={errors.category ? "input-error" : ""} name="category" value={formData.category} onChange={handleChange} placeholder="Self Help" />
          {errors.category && <span className="error-message">{errors.category}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="book-quantity">Quantity</label>
          <input id="book-quantity" className={errors.quantity ? "input-error" : ""} type="number" min="1" name="quantity" value={formData.quantity} onChange={handleChange} />
          {errors.quantity && <span className="error-message">{errors.quantity}</span>}
        </div>
      </div>

      <div className="modal-actions">
        <button className="btn-primary" type="submit"><BookPlus size={17} /> Add book</button>
      </div>
    </form>
  );
};

export default AddBookForm;
