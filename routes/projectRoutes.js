const express = require("express");

const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject
} = require("../controllers/projectController");

const protectAdmin = require("../middleware/authMiddleware");

const router = express.Router();

// Public routes
router.get("/", getProjects);

router.get("/:id", getProject);

// Admin routes
router.post("/", protectAdmin, createProject);

router.put("/:id", protectAdmin, updateProject);

router.delete("/:id", protectAdmin, deleteProject);

module.exports = router;