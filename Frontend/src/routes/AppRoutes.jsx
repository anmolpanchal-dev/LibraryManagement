import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../pages/Dashboard";
import Books from "../pages/Books";
import Members from "../pages/Members";
import IssueBook from "../pages/IssueBook";
import Login from "../pages/Login";
import RoleProtectedRoute from "./RoleProtectedRoute";
import Signup from "../pages/Signup";
import StudentDashboard from "../pages/StudentDashboard";
import useAuth from "../hooks/useAuth";
import StudentBooks from "../pages/StudentBooks";
import StudentCard from "../pages/StudentCard";

function AppRoutes() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout>
              {user?.role === "student" ? <StudentDashboard /> : <Dashboard />}
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              {user?.role === "student" ? <StudentDashboard /> : <Dashboard />}
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/issue-book"
        element={
          <ProtectedRoute>
            <RoleProtectedRoute allowedRoles={["librarian"]}>
              <Layout>
                <IssueBook />
              </Layout>
            </RoleProtectedRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/student-card"
        element={
          <ProtectedRoute>
            <RoleProtectedRoute allowedRoles={["librarian"]}>
              <Layout>
                <StudentCard />
              </Layout>
            </RoleProtectedRoute>
          </ProtectedRoute>
        }
      />

      <Route path="/login" element={<Login />} />
      <Route
        path="/books"
        element={
          <ProtectedRoute>
            <RoleProtectedRoute allowedRoles={["librarian", "admin"]}>
              <Layout>
                <Books />
              </Layout>
            </RoleProtectedRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/student-books"
        element={
          <ProtectedRoute>
            <RoleProtectedRoute allowedRoles={["student"]}>
              <Layout>
                <StudentBooks />
              </Layout>
            </RoleProtectedRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/members"
        element={
          <ProtectedRoute>
            <RoleProtectedRoute allowedRoles={["librarian"]}>
              <Layout>
                <Members />
              </Layout>
            </RoleProtectedRoute>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
