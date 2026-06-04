const Task = require('../models/Task');
const Project = require('../models/Project');

// create a new task within a project
exports.createTask = async (req, res, next) => {
  try {
    const { title, projectId, description, status, priority, dueDate } = req.body;

    if (!title || !projectId) {
      res.status(400);
      throw new Error('Task title and project ID are required');
    }

    // verify the project exists and user is owner
    const project = await Project.findById(projectId);
    if (!project) {
      res.status(404);
      throw new Error('Project not found');
    }

    if (project.ownerId.toString() !== req.user.id) {
      res.status(403);
      throw new Error('Only the project owner can create tasks');
    }

    const task = await Task.create({
      title,
      description,
      projectId,
      ownerId: req.user.id,
      status,
      priority,
      dueDate,
    });

    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

// get all tasks for a specific project
exports.getProjectTasks = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const { status, priority } = req.query;

    // verify project exists and user is owner
    const project = await Project.findById(projectId);
    if (!project) {
      res.status(404);
      throw new Error('Project not found');
    }

    if (project.ownerId.toString() !== req.user.id) {
      res.status(403);
      throw new Error('Only the project owner can view tasks');
    }

    // build query with optional filters
    let query = { projectId };
    if (status) query.status = status;
    if (priority) query.priority = priority;

    const tasks = await Task.find(query);

    res.json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

// get a single task by id
exports.getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }

    // verify user is task owner or project owner
    const project = await Project.findById(task.projectId);
    const isTaskOwner = task.ownerId.toString() === req.user.id;
    const isProjectOwner = project && project.ownerId.toString() === req.user.id;

    if (!isTaskOwner && !isProjectOwner) {
      res.status(403);
      throw new Error('You do not have access to this task');
    }

    res.json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

// update a task (project owner can do this)
exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }

    const project = await Project.findById(task.projectId);
    if (project.ownerId.toString() !== req.user.id) {
      res.status(403);
      throw new Error('Only the project owner can update tasks');
    }

    if (req.body.title) task.title = req.body.title;
    if (req.body.description !== undefined) task.description = req.body.description;
    if (req.body.status) task.status = req.body.status;
    if (req.body.priority) task.priority = req.body.priority;
    if (req.body.dueDate !== undefined) task.dueDate = req.body.dueDate;

    await task.save();

    res.json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

// delete a task (only project owner can do this)
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }

    const project = await Project.findById(task.projectId);
    if (project.ownerId.toString() !== req.user.id) {
      res.status(403);
      throw new Error('Only the project owner can delete tasks');
    }

    await Task.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Task deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
