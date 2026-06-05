import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './Projects.css';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await api.get('/projects');
      setProjects(response.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await api.delete(`/projects/${projectId}`);
        setProjects(projects.filter((p) => p._id !== projectId));
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete project');
      }
    }
  };

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="projects-container">
      <div className="container">
        <div className="projects-header">
          <div>
            <h1>Projects</h1>
            <p>Manage all your projects</p>
          </div>
          <button
            onClick={() => navigate('/projects/new')}
            className="btn btn-primary"
          >
            + New Project
          </button>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <div className="projects-search">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {loading ? (
          <div className="spinner"></div>
        ) : filteredProjects.length > 0 ? (
          <div className="projects-list">
            {filteredProjects.map((project) => (
              <div key={project._id} className="project-item card">
                <div className="project-item-header">
                  <Link to={`/projects/${project._id}`} className="project-name">
                    {project.name}
                  </Link>
                  <div className="project-actions">
                    <Link
                      to={`/projects/${project._id}`}
                      className="btn btn-secondary btn-sm"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => handleDelete(project._id)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p className="project-description">
                  {project.description || 'No description provided'}
                </p>
                <div className="project-item-footer">
                  <span className="text-small text-muted">
                    Created: {new Date(project.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No projects found. Create one to get started!</p>
            <button
              onClick={() => navigate('/projects/new')}
              className="btn btn-primary"
            >
              Create First Project
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectList;
