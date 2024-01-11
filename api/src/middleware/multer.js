const multer = require("multer");
let fs = require("fs-extra");

const storage = multer.diskStorage({
  //destination for files
  destination: function (req, file, cb) {
    let type = req.params.type;
    let path = `./src/public/uploads/${type}`;
    fs.mkdirsSync(path);
    cb(null, path);
  },

  //add back the extension
  filename: function (req, file, cb) {
    cb(
      null,
      new Date().toJSON().slice(0, 10).replace(/-/g, "") +
        "-" +
        file.originalname
    );
  },
});

//upload parameters for multer
const upload = multer({
  storage,
  limits: {
    fieldSize: 1024 * 1024 * 3, // 3MB
  },
});

module.exports = { upload };
