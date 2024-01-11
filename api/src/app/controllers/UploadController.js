const { Upload } = require("../models/Upload");

class UploadController {
  // Upload /upload/:type
  uploadImage = async (req, res, next) => {
    try {
      const { userId, desc, targetId, type } = req.body;

      let urls = req.files.files.map((item) => {
        return "/" + type + "/" + item.filename;
      });

      const newImage = new Upload({
        userId,
        url: urls,
        desc,
        type,
        targetId,
      });
      await newImage.save();
      return res.json(urls);
    } catch (error) {
      next(error);
    }
  };

  getUploadById = async (req, res, next) => {
    const upload = await Upload.findById(req.params.id);
    try {
      res.json(upload);
    } catch (error) {
      next(error);
    }
  };

  getUploadUser = async (req, res, next) => {
    const upload = await Upload.find({ userId: req.params.id }).sort({
      createdAt: -1,
    });
    try {
      res.json(upload);
    } catch (error) {
      next(error);
    }
  };

  deleteUpload = async (req, res, next) => {
    await Upload.findByIdAndDelete(req.params.id);
    try {
      res.json({ message: "Xóa file thành công!" });
    } catch (error) {
      next(error);
    }
  };
}
module.exports = new UploadController();
