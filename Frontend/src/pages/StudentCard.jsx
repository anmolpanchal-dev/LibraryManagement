import { useMemo, useState } from "react";
import useMembers from "../hooks/useMembers";
import useBooks from "../hooks/useBooks";

import {
  UserRound,
  BookOpen,
  CalendarDays,
  Clock3,
  Search,
  ArrowLeft,
  RotateCcw,
  Mail,
  Phone,
  BookMarked,
} from "lucide-react";

import "./StudentCard.css";

const StudentCard = () => {
  const { members = [] } = useMembers();
  const { books = [], returnBook } = useBooks();

  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [pendingReturn, setPendingReturn] = useState(null);

  const students = useMemo(() => {
    return members.filter(
      (member) => member.role !== "librarian"
    );
  }, [members]);

  const filteredStudents = useMemo(() => {
    if (!search.trim()) return students;

    const matched = students.filter((student) =>
      student.studentId
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

    const others = students.filter(
      (student) =>
        !student.studentId
          ?.toLowerCase()
          .includes(search.toLowerCase())
    );

    return [...matched, ...others];
  }, [students, search]);

  const issuedBooks = useMemo(() => {
    if (!selectedStudent) return [];

    return books.flatMap((book) =>
      (book.issuedTo || [])
        .filter(
          (item) =>
            item.memberId === selectedStudent._id
        )
        .map((item) => ({
          mongoBookId: book._id,
          bookName: book.name,
          bookId: item.customBookId,
          date: item.date,
          time: item.time,
          memberName: item.memberName,
        }))
    );
  }, [books, selectedStudent]);

  const confirmReturn = () => {
    if (!pendingReturn) return;

    returnBook(
      pendingReturn.bookId,
      pendingReturn.memberName
    );

    setPendingReturn(null);
  };

  // ==========================
  // STUDENT DETAIL PAGE
  // ==========================

  if (selectedStudent) {
    return (
      <div className="student-card-page">

        <button
          className="back-btn"
          onClick={() =>
            setSelectedStudent(null)
          }
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="student-detail glass-card">

          <div className="detail-header">
            <div className="avatar large">
              <UserRound size={42} />
            </div>

            <div>
              <h2>{selectedStudent.name}</h2>

              <p>
                Student ID :
                {selectedStudent.studentId}
              </p>
            </div>
          </div>

          <div className="detail-info">

  <p>
    <Mail size={18}/>
    <span>
      Email
      <strong>{selectedStudent.email}</strong>
    </span>
  </p>


  <p>
    <Phone size={18}/>
    <span>
      Phone
      <strong>{selectedStudent.phone}</strong>
    </span>
  </p>


  <p>
    <BookMarked size={18}/>
    <span>
      Issued Books
      <strong>{issuedBooks.length}</strong>
    </span>
  </p>

</div>

          <h3>Issued Books</h3>

          {issuedBooks.length > 0 ? (
            issuedBooks.map((book, index) => (
              <div
                key={index}
                className="issued-item"
              >
                <strong>
                  <BookOpen size={16} />
                  {book.bookName}
                </strong>

                <p>
                  Book ID :
                  {book.bookId ||
                    "Not Assigned"}
                </p>

                <span>
                  <CalendarDays size={14} />
                  {book.date}
                </span>

                <span>
                  <Clock3 size={14} />
                  {book.time}
                </span>

                <button
                  className="return-btn"
                  onClick={() =>
                    setPendingReturn({
                      bookId:
                        book.mongoBookId,
                      bookName:
                        book.bookName,
                      memberName:
                        selectedStudent.name,
                    })
                  }
                >
                  <RotateCcw size={16} />
                  Return Book
                </button>
              </div>
            ))
          ) : (
            <p>No books issued</p>
          )}

        </div>

        {pendingReturn && (
          <div className="modal-overlay">
            <div className="modal confirm-modal">

              <h2>
                Confirm Return
              </h2>

              <p>
                Return
                <strong>
                  {" "}
                  {pendingReturn.bookName}
                  {" "}
                </strong>
                from
                <strong>
                  {" "}
                  {pendingReturn.memberName}
                </strong>
                ?
              </p>

              <div className="modal-actions">

                <button
                  className="btn-secondary"
                  onClick={() =>
                    setPendingReturn(null)
                  }
                >
                  Cancel
                </button>

                <button
                  className="btn-success"
                  onClick={confirmReturn}
                >
                  Confirm Return
                </button>

              </div>

            </div>
          </div>
        )}

      </div>
    );
  }

  // ==========================
  // STUDENT LIST PAGE
  // ==========================

  return (
    <div className="student-card-page">

      <div className="page-header">
        <div>
          <h1>Student Cards</h1>

          <p>
            Search and manage student
            library records
          </p>
        </div>
      </div>

      <div className="student-search">

        <Search size={18} />

        <input
          type="text"
          placeholder="Search Student ID"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

      <div className="student-grid">

        {filteredStudents.map((student) => (
          <div
            key={student._id}
            className="student-mini-card"
            onClick={() =>
              setSelectedStudent(student)
            }
          >
            <div className="avatar">
              <UserRound />
            </div>

            <h3>{student.name}</h3>

            <p>{student.studentId}</p>

            <span>{student.email}</span>
          </div>
        ))}

      </div>

    </div>
  );
};

export default StudentCard;
