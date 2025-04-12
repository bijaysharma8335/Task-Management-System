const express = require("express");
const { protectedRoute, isAdminRoute } = require("../middleware/authMiddleware");

const { createTask, duplicateTask, postTaskActivity, dashboardStatistics, getTasks, getTask } = require("../controllers/taskController");

const router = express.Router();

router.post("/create", protectedRoute, isAdminRoute, createTask);



router.post("/duplicate/:id",protectedRoute,isAdminRoute,duplicateTask);


router.post("/activity/:id",protectedRoute,postTaskActivity);

router.get("/dashboard",protectedRoute,dashboardStatistics);


router.get("/",protectedRoute,getTasks);
router.get("/:id",protectedRoute,getTask);
module.exports = router;
