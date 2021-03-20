const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: path.join(process.cwd(), "uploads"),
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".wav");
  },
});

const uploader = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "audio/x-wav" || file.mimetype === "audio/wav") {
      return cb(null, true);
    }
    req.fileValidationError = true;
    return cb(null, false);
  },
});

module.exports = uploader;
