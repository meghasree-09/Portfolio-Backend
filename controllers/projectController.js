const Project = require("../models/Project");

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({
      createdAt: -1
    });

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
    const {
      title,
      description,
      technologies,
      image,
      github,
      liveDemo
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are required"
      });
    }

    const project = await Project.create({
      title,
      description,
      technologies: technologies || [],
      image: image || "",
      github: github || "",
      liveDemo: liveDemo || ""
    });

    res.status(201).json(project);

  } catch (error) {
    res.status(500).json({
      message: "Failed to create project",
      error: error.message
    });
  }
};


const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!project) {
      return res.status(404).json({
        message: "Project not found"
      });
    }

    res.status(200).json(project);

  } catch (error) {
    res.status(500).json({
      message: "Failed to update project",
      error: error.message
    });
  }
};


const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(
      req.params.id
    );

    if (!project) {
      return res.status(404).json({
        message: "Project not found"
      });
    }

    res.status(200).json({
      message: "Project deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to delete project",
      error: error.message
    });
  }
};


module.exports = {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject
};