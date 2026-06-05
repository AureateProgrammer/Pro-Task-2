import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Layout/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import ProjectList from './components/Projects/ProjectList';
import ProjectForm from './components/Projects/ProjectForm';
import ProjectDetail from './components/Projects/ProjectDetail';
import NotFound from './components/Pages/NotFound';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="*"
            element={
              <>
                <Navbar />
                <Routes>
                  <Route
                    path="/"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/projects"
                    element={
                      <ProtectedRoute>
                        <ProjectList />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/projects/new"
                    element={
                      <ProtectedRoute>
                        <ProjectForm />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/projects/:id"
                    element={
                      <ProtectedRoute>
                        <ProjectDetail />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/projects/:id/edit"
                    element={
                      <ProtectedRoute>
                        <ProjectForm />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/404" element={<NotFound />} />
                  <Route path="*" element={<Navigate to="/404" replace />} />
                </Routes>
              </>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
