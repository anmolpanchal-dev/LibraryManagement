import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Books from "../pages/Books";
import Members from "../pages/Members";
import IssueBook from "../pages/IssueBook";
import IssuedBooks from "../pages/IssuedBooks";
import ReturnBook from "../pages/ReturnBook";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/books" element={<Books />} />
      <Route path="/members" element={<Members />} />
      <Route path="/issue-book" element={<IssueBook />} />
      <Route path="/issued-books" element={<IssuedBooks />} />
      <Route path="/return-book" element={<ReturnBook />} />
    </Routes>
  );
};

export default AppRoutes;