import { useState } from "react";
import { Save } from "lucide-react";
import "./EditMemberModal.css";

const EditMemberModal = ({ editingMember, updateMember, closeModal }) => {
  if (!editingMember) return null;

  return (
    <EditMemberForm
      key={editingMember.id}
      editingMember={editingMember}
      updateMember={updateMember}
      closeModal={closeModal}
    />
  );
};

const EditMemberForm = ({ editingMember, updateMember, closeModal }) => {
  const [form, setForm] = useState(() => ({
    name: editingMember.name || "",
    email: editingMember.email || "",
    phone: editingMember.phone || "",
    id: editingMember.id,
  }));

  const handleChange = (e) => {
    setForm((current) => ({ ...current, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMember(form);
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal">
        <form className="form-grid" onSubmit={handleSubmit}>
          <div>
            <span className="page-kicker">Member Editor</span>
            <h2>Edit member profile</h2>
          </div>

          <div className="form-group">
            <label htmlFor="edit-member-name">Full name</label>
            <input id="edit-member-name" name="name" value={form.name} onChange={handleChange} required />
          </div>

          <div className="form-grid two">
            <div className="form-group">
              <label htmlFor="edit-member-email">Email</label>
              <input id="edit-member-email" type="email" name="email" value={form.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="edit-member-phone">Phone</label>
              <input id="edit-member-phone" name="phone" value={form.phone} onChange={handleChange} required />
            </div>
          </div>

          <div className="modal-actions">
            <button className="btn-secondary" type="button" onClick={closeModal}>Cancel</button>
            <button className="btn-primary" type="submit"><Save size={17} /> Save changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMemberModal;
