const express = require("express");
const {
    registerUser,
    loginUser,
    getTeamList,
    getNotificationsList,
    updateUserProfile,
    markNotificationRead,
    changeUserPassword,
    logoutUser,
    deleteUserProfile,
    activateUserProfile,
} = require("../controllers/userController");

const { protectedRoute, isAdminRoute } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

//protected routes
router.get("/get-team-list", protectedRoute, isAdminRoute, getTeamList);
router.get("/notifications", protectedRoute, getNotificationsList);

router.put("/profile", protectedRoute, updateUserProfile);

router.put("read-notifications", protectedRoute, markNotificationRead);
router.put("/change-password", protectedRoute, changeUserPassword);

// //   FOR ADMIN ONLY - ADMIN ROUTES
router
    .route("/:id")
    .put(protectedRoute, isAdminRoute, activateUserProfile)
    .delete(protectedRoute, isAdminRoute, deleteUserProfile);

module.exports = router;
