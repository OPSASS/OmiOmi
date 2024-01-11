const router = require("express").Router();
const { upload } = require("../middleware/multer");

// [upload]
// Upload Proccess
const cpUpload = upload.fields([{ name: "files", maxCount: 12 }]);

// Add Route
const UploadController = require("../app/controllers/UploadController");
// upload
// POST /upload/:type
router.post("/:type", cpUpload, UploadController.uploadImage);

// Get a upload
// GET /upload/:id
router.get("/:id", UploadController.getUploadById);

// Update Submit upload Route
// PUT /upload/edit/:id
router.get("/user/:id", UploadController.getUploadUser);

// Delete Posts
// DELETE /upload/:id/delete
router.delete("/delete/:id", UploadController.deleteUpload);

module.exports = router;
