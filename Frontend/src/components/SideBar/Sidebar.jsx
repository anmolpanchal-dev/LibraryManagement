import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  LayoutDashboard,
  Library,
  UsersRound,
  UserRound,
} from "lucide-react";
import "./Sidebar.css";

const Sidebar = ({
  collapsed,
  mobileOpen,
  onToggleCollapse,
  onCloseMobile,
}) => {
  const { user } = useAuth();
  console.log("USER ROLE =", user?.role);
  console.log("FULL USER", user);
  const navItems =
    user?.role === "librarian" || user?.role === "admin"
      ? [
          { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
          { to: "/books", label: "Books", icon: BookOpen },
          { to: "/members", label: "Members", icon: UsersRound },
          { to: "/issue-book", label: "Issue Book", icon: ClipboardCheck },
          {
            to: "/student-card",
            label: "Student Card",
            icon: UserRound,
          },
        ]
      : [
          { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
          { to: "/student-books", label: "Books", icon: BookOpen },
        ];

  return (
    <aside
      className={`sidebar ${collapsed ? "is-collapsed" : ""} ${mobileOpen ? "is-open" : ""}`}
    >
      <div className="sidebar-brand">
        <div className="brand-mark">
          <Library size={24} />
        </div>
        <div className="brand-copy">
          <strong>LibraFlow</strong>
          <span>Enterprise LMS</span>
        </div>
      </div>

      <button
        className="collapse-button"
        onClick={onToggleCollapse}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>

      <nav className="sidebar-menu" aria-label="Main navigation">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onCloseMobile}
              title={item.label}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-insight">
        <span className="badge badge-primary">Live</span>
        <strong>98.4%</strong>
        <p>
          Catalog health score across circulation, inventory, and member
          records.
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
