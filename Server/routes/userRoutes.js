const express = require("express");
const { registerUser, loginUser, getTeamList, getNotificationsList, updateUserProfile, markNotificationRead, changeUserPassword } = require("../controllers/userController");

const { protectedRoute, isAdminRoute } = require("../middleware/authMiddleware");


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

//protected routes
router.get("/get-team-list", protectedRoute, isAdminRoute, getTeamList);
router.get("/notifications",protectedRoute,getNotificationsList)


router.put("/profile",protectedRoute,updateUserProfile);

router.put("read-notifications",protectedRoute,markNotificationRead);
router.put("/change-password",protectedRoute,changeUserPassword);





module.exports = router;
