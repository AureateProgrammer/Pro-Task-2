const express = require('express');
const healthRoutes = require('./health');
const authRoutes = require('./auth');
const projectRoutes = require('./projects');
const taskRoutes = require('./tasks');

const router = express.Router();

router.use('/health', healthRoutes);
router.use('/auth', authRoutes);
router.use('/projects', projectRoutes);
router.use('/tasks', taskRoutes);

module.exports = router;
