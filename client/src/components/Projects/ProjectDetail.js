import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';
import './Projects.css';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskStatus, setTaskStatus] = useState('todo');
  const [showTaskForm, setShowTaskForm] = useState(false);

  useEffect(() => {
    fetchProjectDetail();
  }, [id]);

  const fetchProjectDetail = async () => {
    try {
      setLoading(true);
      const [projectResponse, tasksResponse] = await Promise.all([
        api.get(`/projects/${id}`),
        api.get(`/tasks?projectId=${id}`),
      ]);
      setProject(projectResponse.data);
      setTasks(tasksResponse.data || []);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch project details');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    setError('');

    if (!taskName.trim()) {
      setError('Task name is required');
      return;
    }

    try {
      const response = await api.post('/tasks', {
        name: taskName,
        description: taskDescription,
        projectId: id,
        status: taskStatus,
      });
      setTasks([...tasks, response.data]);
      setTaskName('');
      setTaskDescription('');
      setTaskStatus('todo');
      setShowTaskForm(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create task');
    }
  };

  const handleUpdateTaskStatus = async (taskId, newStatus) => {
    try {
      const response = await api.put(`/tasks/${taskId}`, { status: newStatus });
      setTasks(
        tasks.map((t) => (t._id === taskId ? response.data : t))
      );
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await api.delete(`/tasks/${taskId}`);
        setTasks(tasks.filter((t) => t._id !== taskId));
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete task');
      }
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container">
        <div className="alert alert-error">Project not found</div>
        <Link to="/projects" className="btn btn-secondary">
          Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="project-detail-container">
      <div className="container">
        <div className="project-detail-header">
          <div>
            <Link to="/projects" className="back-link">
              ← Back to Projects
            </Link>
            <h1>{project.name}</h1>
            <p>{project.description || 'No description'}</p>
          </div>
          <div className="project-actions">
            <Link to={`/projects/${id}/edit`} className="btn btn-secondary">
              Edit
            </Link>
            <button
              onClick={() => navigate('/projects')}
              className="btn btn-secondary"
            >
              Back
            </button>
          </div>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <div className="tasks-section">
          <div className="tasks-header">
            <h2>Tasks</h2>
            <button
              onClick={() => setShowTaskForm(!showTaskForm)}
              className="btn btn-primary"
            >
              {showTaskForm ? 'Cancel' : '+ Add Task'}
            </button>
          </div>

          {showTaskForm && (
            <form className="task-form card" onSubmit={handleAddTask}>
              <div className="form-group">
                <label htmlFor="taskName">Task Name *</label>
                <input
                  id="taskName"
                  type="text"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  placeholder="Enter task name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="taskDescription">Description</label>
                <textarea
                  id="taskDescription"
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  placeholder="Enter task description"
                />
              </div>

              <div className="form-group">
                <label htmlFor="taskStatus">Status</label>
                <select
                  id="taskStatus"
                  value={taskStatus}
                  onChange={(e) => setTaskStatus(e.target.value)}
                >
                  <option value="todo">To Do</option>
                  <option value="inProgress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <button type="submit" className="btn btn-success">
                Add Task
              </button>
            </form>
          )}

          {tasks.length > 0 ? (
            <div className="tasks-grid">
              {tasks.map((task) => (
                <div key={task._id} className="task-card card">
                  <h3>{task.name}</h3>
                  <p>{task.description || 'No description'}</p>

                  <div className="task-status">
                    <select
                      value={task.status}
                      onChange={(e) =>
                        handleUpdateTaskStatus(task._id, e.target.value)
                      }
                      className={`status-select status-${task.status}`}
                    >
                      <option value="todo">To Do</option>
                      <option value="inProgress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>

                  <div className="task-actions">
                    <button
                      onClick={() => handleDeleteTask(task._id)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No tasks yet. Add one to get started!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
