import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import api from '../../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await api.get('/projects');
        setProjects(response.data.slice(0, 6)); // Show first 6 projects
        setError('');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <div>
            <h1>Welcome, {user?.name}! 👋</h1>
            <p>Manage your projects and tasks efficiently</p>
          </div>
          <Link to="/projects/new" className="btn btn-primary">
            + New Project
          </Link>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <h3>{projects.length}</h3>
            <p>Projects</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <h3>0</h3>
            <p>Completed Tasks</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏳</div>
            <h3>0</h3>
            <p>Pending Tasks</p>
          </div>
        </div>

        <div className="dashboard-section">
          <div className="section-header">
            <h2>Recent Projects</h2>
            <Link to="/projects" className="view-all-link">
              View all →
            </Link>
          </div>

          {loading ? (
            <div className="spinner"></div>
          ) : projects.length > 0 ? (
            <div className="grid grid-3">
              {projects.map((project) => (
                <Link
                  key={project._id}
                  to={`/projects/${project._id}`}
                  className="card project-card"
                >
                  <h3>{project.name}</h3>
                  <p>{project.description || 'No description'}</p>
                  <div className="project-meta">
                    <span className="badge">📅 {new Date(project.createdAt).toLocaleDateString()}</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No projects yet. Create your first project to get started!</p>
              <Link to="/projects/new" className="btn btn-primary">
                Create Project
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
