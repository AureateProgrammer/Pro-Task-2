import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './AppLayout.css';

const Sidebar = ({ onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    if (onClose) onClose();
  };

  return (
    <aside className="app-sidebar">
      <div className="sidebar-header">
        <div className="brand">📋 Pro-Tasker</div>
      </div>

      <nav className="sidebar-nav">
        <Link to="/" className="sidebar-link" onClick={onClose}>
          Dashboard
        </Link>
        <Link to="/projects" className="sidebar-link" onClick={onClose}>
          Projects
        </Link>
        <Link to="/projects/new" className="sidebar-link" onClick={onClose}>
          New Project
        </Link>
      </nav>

      <div className="sidebar-footer">
        {user && <div className="sidebar-user">Signed in as {user.name}</div>}
        <button className="btn btn-secondary sidebar-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
