import { useMemo, useState } from "react";
import { CheckCircle2, Edit3, Search, Trash2, UserPlus, UsersRound, XCircle } from "lucide-react";
import useMembers from "../hooks/useMembers";
import DataTable from "../components/DataTable/DataTable";
import AddMemberForm from "../components/AddMemberForm/AddMemberForm";
import EditMemberModal from "../components/EditMemberModal/EditMemberModal";
import "./Members.css";

const PAGE_SIZE = 9;

const initials = (name = "") =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const Members = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [notification, setNotification] = useState(null);
  const { members = [], addMember, deleteMember, updateMember } = useMembers();

  const filteredMembers = useMemo(() => {
    const query = search.toLowerCase();
    return members.filter((member) =>
      (member.name || "").toLowerCase().includes(query) ||
      (member.email || "").toLowerCase().includes(query) ||
      (member.phone || "").includes(query)
    );
  }, [members, search]);

  const totalPages = Math.max(1, Math.ceil(filteredMembers.length / PAGE_SIZE));
  const visibleMembers = filteredMembers.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const showToast = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 2600);
  };

const handleAddMember = async (member) => {
  const result = await addMember(member);
  return result;
};

  const handleDeleteMember = (id) => {
    deleteMember(id);
    showToast("success", "Member removed.");
  };

  const handleUpdateMember = (updatedMember) => {
    updateMember(updatedMember);
    setEditingMember(null);
    showToast("success", "Member profile updated.");
  };

  const columns = [
    { key: "name", label: "Member" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "status", label: "Status" },
  ];

  return (
    <div className="members-page page-shell">
      <header className="page-header">
        <div>
          <span className="page-kicker"><UsersRound size={14} /> People</span>
          <h1>Members Management</h1>
          <p className="page-subtitle">Manage student, faculty, and organization member profiles.</p>
        </div>
        <button className="btn-primary" onClick={() => setShowAddModal(true)}>
          <UserPlus size={18} /> Add Member
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
              placeholder="Search by name, email, or phone"
            />
          </div>
          <span className="badge badge-primary">{filteredMembers.length} members</span>
        </div>

        {filteredMembers.length > 0 ? (
          <>
            <DataTable
              columns={columns}
              data={visibleMembers}
              renderCell={(member, col) => {
                if (col.key === "name") {
                  return (
                    <div className="table-title-cell">

  <span className="member-avatar">
    {initials(member.name)}
  </span>

  <div className="member-info">

    <strong>{member.name}</strong>

    <span className="student-id">
      ID #{member.studentId || "Generating..."}
    </span>

  </div>

</div>
                  );
                }

                if (col.key === "status") {
                  return <span className="badge badge-success">Active</span>;
                }

                return member[col.key] || "-";
              }}
              renderActions={(member) => (
                <div className="action-buttons">
                  <button className="btn-secondary btn-sm" onClick={() => setEditingMember(member)}>
                    <Edit3 size={15} /> Edit
                  </button>
                  <button className="btn-danger btn-sm" onClick={() => handleDeleteMember(member._id)}>
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
            <div className="empty-illustration"><UsersRound size={34} /></div>
            <strong>No members found</strong>
            <p>Try a different search or add a new member profile.</p>
          </div>
        )}
      </section>

{showAddModal && (
  <div className="modal-overlay">
    <div className="modal">
      <AddMemberForm
        onAddMember={handleAddMember}
        onDone={() => setShowAddModal(false)}
      />

      <button
        className="btn-secondary modal-close"
        onClick={() => setShowAddModal(false)}
      >
        Close
      </button>
    </div>
  </div>
)}

      <EditMemberModal editingMember={editingMember} updateMember={handleUpdateMember} closeModal={() => setEditingMember(null)} />
    </div>
  );
};

export default Members;
