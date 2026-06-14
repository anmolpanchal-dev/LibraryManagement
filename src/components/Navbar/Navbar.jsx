import { useEffect, useState } from "react";
import { Bell, Menu, Moon, Search, Sun } from "lucide-react";
import "./Navbar.css";

const Navbar = ({ onMenuClick }) => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <nav className="navbar">
      <button className="btn-icon nav-menu" onClick={onMenuClick} aria-label="Open navigation">
        <Menu size={20} />
      </button>

      <div className="nav-search">
        <Search size={18} />
        <input aria-label="Search library" placeholder="Search books, members, records..." />
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

        <button className="btn-icon notification-button" aria-label="Notifications" title="Notifications">
          <Bell size={18} />
          <span />
        </button>

        <button className="profile-menu" aria-label="Open profile menu">
          <span className="profile-avatar">AD</span>
          <span className="profile-copy">
            <strong>Admin Desk</strong>
            <small>University Library</small>
          </span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
