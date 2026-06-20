import { createPortal } from "react-dom";
import "./EditBookModal.css";
import EditBookForm from "../EditBookForm/EditBookForm";

const EditBookModal = ({
  editingBook,
  updateBook,
  closeModal,
}) => {
  if (!editingBook) return null;

  return createPortal(
    <div className="modal-overlay">
      <div className="modal-box">
        <EditBookForm
          key={editingBook.id}
          editingBook={editingBook}
          updateBook={updateBook}
          closeModal={closeModal}
        />
      </div>
    </div>,
    document.body
  );
};

export default EditBookModal;