import { useEffect, useState } from "react";
import { Bell, Menu, Moon, Search, Sun } from "lucide-react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Navbar = ({ onMenuClick }) => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  const [showMenu, setShowMenu] = useState(false);

  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <nav className="navbar">
      <button
        className="btn-icon nav-menu"
        onClick={onMenuClick}
        aria-label="Open navigation"
      >
        <Menu size={20} />
      </button>

      <div className="nav-search">
      </div>

      <div className="navbar-actions">
        <button
          className="btn-icon"
          onClick={() => setDarkMode((value) => !value)}
          aria-label="Toggle dark mode"
          title="Toggle dark mode"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button
          className="btn-icon notification-button"
          aria-label="Notifications"
          title="Notifications"
        >
          <Bell size={18} />
          <span />
        </button>

       <div className="profile-wrapper">
  <button
    className="profile-menu"
    onClick={() => setShowMenu(!showMenu)}
  >
    <span className="profile-avatar">
      {user?.name?.charAt(0)?.toUpperCase()}
    </span>

    <span className="profile-copy">
      <strong>{user?.name}</strong>
      <small>{user?.role}</small>
    </span>
  </button>

  {showMenu && (
    <div className="dropdown-menu">
      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  )}
</div>
      </div>
    </nav>
  );
};

export default Navbar;
