const path = require("path");
const fs = require("fs");
const multer = require("multer");
const createError = require("http-errors");

function check(upload_path) {
  fs.readdir(upload_path, (err, files) => {
    for (const file of files) {
      fs.unlink(path.join(upload_path, file), (err) => {
        if (err) createError("File Error"); // Not efficient
      });
    }
  });
}

function uploader(allowed_file_types, max_file_size, error_msg, upload_path) {
  // // first empty the uploads file if there is any file exits
  // check(upload_path);

  // define the storage
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, upload_path);
    },
    filename: (req, file, cb) => {
      const fileExt = path.extname(file.originalname);
      const fileName =
        file.originalname
          .replace(fileExt, "")
          .toLowerCase()
          .split(" ")
          .join("-") +
        "-" +
        Date.now() +
        fileExt;

      cb(null, fileName);
    },
  });

  // preapre the final multer upload object
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: max_file_size,
    },
    fileFilter: (req, file, cb) => {
      if (allowed_file_types.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error(error_msg));
      }
    },
  });

  return upload;
}

module.exports = {
  uploader,
};
