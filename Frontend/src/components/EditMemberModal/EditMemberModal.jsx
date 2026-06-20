import { useState } from "react";
import { createPortal } from "react-dom";
import { Save } from "lucide-react";
import "./EditMemberModal.css";

const EditMemberModal = ({
  editingMember,
  updateMember,
  closeModal,
}) => {
  if (!editingMember) return null;

  return createPortal(
    <EditMemberForm
      key={editingMember._id}
      editingMember={editingMember}
      updateMember={updateMember}
      closeModal={closeModal}
    />,
    document.body
  );
};

const EditMemberForm = ({
  editingMember,
  updateMember,
  closeModal,
}) => {
  const [form, setForm] = useState({
    _id: editingMember._id,
    name: editingMember.name || "",
    email: editingMember.email || "",
    phone: editingMember.phone || "",
  });

  const handleChange = (e) => {
    setForm((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMember(form);
  };

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
    >
      <div className="modal">
        <form className="form-grid" onSubmit={handleSubmit}>
          <div>
            <span className="page-kicker">
              Member Editor
            </span>
            <h2>Edit Member Profile</h2>
          </div>

          <div className="form-group">
            <label htmlFor="edit-member-name">
              Full Name
            </label>
            <input
              id="edit-member-name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-grid two">
            <div className="form-group">
              <label htmlFor="edit-member-email">
                Email
              </label>
              <input
                id="edit-member-email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="edit-member-phone">
                Phone
              </label>
              <input
                id="edit-member-phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="modal-actions">
            <button
              className="btn-secondary"
              type="button"
              onClick={closeModal}
            >
              Cancel
            </button>

            <button
              className="btn-primary"
              type="submit"
            >
              <Save size={17} />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMemberModal;