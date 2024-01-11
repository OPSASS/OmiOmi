const router = require("express").Router();
const authController = require("../app/controllers/AuthController");

// [POST]
// Register Proccess
router.post("/register", authController.registerProcess);

// Login Process
router.post("/login", authController.loginProcess);

// Reset password process
router.post("/reset/search", authController.searchAcc);

router.post("/reset", authController.resetProcess);

router.post("/user/:id/reset", authController.changePassword);

// // /auth/reset/:token
// router.post("/reset/:token", authController.resetToken);

module.exports = router;
