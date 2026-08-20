const Project = require("../models/Project");

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get projects",
      error: error.message
    });
  }
};

const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found"
      });
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get project",
      error: error.message
    });
  }
};

const createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create project",
      error: error.message
    });
  }
};

module.exports = {
  getProjects,
  getProject,
  createProject
};