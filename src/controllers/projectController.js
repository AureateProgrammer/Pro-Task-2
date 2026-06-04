const Project = require('../models/Project');

// create a new project
exports.createProject = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      res.status(400);
      throw new Error('Project name is required');
    }

    const project = await Project.create({
      name,
      description,
      ownerId: req.user.id,
    });

    res.status(201).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

// get all projects owned by the user
exports.getUserProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({ ownerId: req.user.id });

    res.json({
      success: true,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};

// get a single project by id
exports.getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      res.status(404);
      throw new Error('Project not found');
    }

    // only owner can view
    if (project.ownerId.toString() !== req.user.id) {
      res.status(403);
      throw new Error('You do not have access to this project');
    }

    res.json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

// update a project (only owner can do this)
exports.updateProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      res.status(404);
      throw new Error('Project not found');
    }

    if (project.ownerId.toString() !== req.user.id) {
      res.status(403);
      throw new Error('Only the project owner can update this project');
    }

    if (req.body.name) project.name = req.body.name;
    if (req.body.description !== undefined) project.description = req.body.description;
    if (req.body.status) project.status = req.body.status;

    await project.save();

    res.json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

// delete a project (only owner can do this)
exports.deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      res.status(404);
      throw new Error('Project not found');
    }

    if (project.ownerId.toString() !== req.user.id) {
      res.status(403);
      throw new Error('Only the project owner can delete this project');
    }

    await Project.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Project deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
