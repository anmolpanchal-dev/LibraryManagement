import "./EditBookModal.css";
import EditBookForm from "../../EditBookForm/EditBookForm";

const EditBookModal = ({
  editingBook,
  updateBook,
  closeModal,
}) => {
  if (!editingBook) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <EditBookForm
          key={editingBook.id}
          editingBook={editingBook}
          updateBook={updateBook}
          closeModal={closeModal}
        />
      </div>
    </div>
  );
};

export default EditBookModal;
