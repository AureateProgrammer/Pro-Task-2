import React from 'react';
import Sidebar from './Sidebar';
import './AppLayout.css';

const AppLayout = ({ children }) => {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <div className="app-layout">
      <Sidebar onClose={() => setCollapsed(true)} />

      <div className="app-main">
        <header className="topbar">
          <button
            className="topbar-toggle"
            onClick={() => setCollapsed((s) => !s)}
            aria-label="Toggle sidebar"
          >
            ☰
          </button>
          <div className="topbar-title">Pro-Tasker</div>
        </header>

        <main className="main-content">{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;
