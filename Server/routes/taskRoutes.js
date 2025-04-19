const express = require("express");
const { protectedRoute, isAdminRoute } = require("../middleware/authMiddleware");

const {
    createTask,
    duplicateTask,
    postTaskActivity,
    dashboardStatistics,
    getTasks,
    getTask,
    createSubTask,
    updateTask,
    trashTask,
    deleteRestoreTask,
} = require("../controllers/taskController");

const router = express.Router();

router.post("/create", protectedRoute, isAdminRoute, createTask);

router.post("/duplicate/:id", protectedRoute, isAdminRoute, duplicateTask);

router.post("/activity/:id", protectedRoute, postTaskActivity);

router.get("/dashboard", protectedRoute, dashboardStatistics);

router.get("/", protectedRoute, getTasks);
router.get("/:id", protectedRoute, getTask);

router.put("/create-subtask/:id", protectedRoute, isAdminRoute, createSubTask);

router.put("/update/:id", protectedRoute, isAdminRoute, updateTask);

router.put("/:id", protectedRoute, trashTask);

router.delete("/delete-restore/:id", protectedRoute, isAdminRoute, deleteRestoreTask);

module.exports = router;
