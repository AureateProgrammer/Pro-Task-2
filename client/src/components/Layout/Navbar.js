import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
            <span className="brand-icon">📋</span>
            Pro-Tasker
          </Link>

          <button
            className="navbar-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          <div className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
            {user && (
              <>
                <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
                  Dashboard
                </Link>
                <Link to="/projects" className="nav-link" onClick={() => setMenuOpen(false)}>
                  Projects
                </Link>
                <div className="navbar-user">
                  <span className="user-name">{user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="btn btn-secondary nav-logout"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
