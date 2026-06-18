import { useState } from "react";
import { UserPlus } from "lucide-react";
import "./AddMemberForm.css";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  password: "",
  studentId: "",
};

const AddMemberForm = ({ onAddMember, onDone }) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Enter a valid email";
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^\d{10}$/.test(form.phone.replace(/\D/g, "")))
      newErrors.phone = "Phone must be 10 digits";
    if (!form.password.trim()) newErrors.password = "Password is required";
    else if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    
    // ❌ CHNAGE 1: Yahan se required ka check hata diya hai
    // Kyunki agar khali hoga, toh backend auto-generate kar dega.
    
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: "" }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const newErrors = validateForm();

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }


  const result = await onAddMember(form);


  if (!result.success) {

    setErrors({
      email: result.message
    });

    return;
  }


  setForm(initialForm);
  setErrors({});
  onDone?.();

};

  return (
    <form className="add-member-form form-grid" onSubmit={handleSubmit}>
      <div>
        <span className="page-kicker">
          <UserPlus size={14} /> New Member
        </span>
        <h2>Add member profile</h2>
      </div>

      <div className="form-group">
        <label htmlFor="member-name">Full name</label>
        <input
          id="member-name"
          className={errors.name ? "input-error" : ""}
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Aarav Mehra"
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div className="form-grid two">
        <div className="form-group">
          <label htmlFor="member-email">Email</label>
          <input
            id="member-email"
            className={errors.email ? "input-error" : ""}
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="aarav@university.edu"
          />
          {errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="student-id">Student ID</label>
          <input
            id="student-id"
            name="studentId"
            value={form.studentId}
            onChange={handleChange}
            placeholder="Leave blank to auto-generate (LIB1001)"
            className={errors.studentId ? "input-error" : ""}
          />
          {/* 💡 CHANGE 2: Librarian ki help ke liye ek chhota note */}
          {!form.studentId.trim() && (
 <p className="hint-text">
   Leave blank for auto ID
 </p>
)}
          {errors.studentId && (
            <span className="error-message">{errors.studentId}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="member-phone">Phone</label>
          <input
            id="member-phone"
            className={errors.phone ? "input-error" : ""}
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="9876543210"
          />
          {errors.phone && (
            <span className="error-message">{errors.phone}</span>
          )}
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="member-password">Password</label>
        <input
          id="member-password"
          className={errors.password ? "input-error" : ""}
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter temporary password"
        />
        {errors.password && (
          <span className="error-message">{errors.password}</span>
        )}
      </div>
      <div className="modal-actions">
        <button className="btn-primary" type="submit">
          <UserPlus size={17} /> Add member
        </button>
      </div>
    </form>
  );
};

export default AddMemberForm;