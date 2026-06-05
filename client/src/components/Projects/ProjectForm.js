import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';
import './Projects.css';

const ProjectForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchProject = async () => {
    try {
      const response = await api.get(`/projects/${id}`);
      const project = response.data;
      setName(project.name);
      setDescription(project.description || '');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch project');
    }
  };

  useEffect(() => {
    if (id) {
      fetchProject();
    }
  }, [id, fetchProject]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Project name is required');
      return;
    }

    setLoading(true);

    try {
      if (id) {
        await api.put(`/projects/${id}`, { name, description });
        navigate(`/projects/${id}`);
      } else {
        const response = await api.post('/projects', { name, description });
        navigate(`/projects/${response.data._id}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="container">
        <div className="form-card">
          <h1>{id ? 'Edit Project' : 'Create New Project'}</h1>

          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Project Name *</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter project name"
                disabled={loading}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter project description"
                disabled={loading}
              />
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading
                  ? 'Saving...'
                  : id
                  ? 'Update Project'
                  : 'Create Project'}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate('/projects')}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProjectForm;
