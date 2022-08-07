const multer = require("multer");
const path = require("path");
const fs = require("fs");
const createError = require("http-errors");

class ImageUploader {
  constructor(pathname, size) {
    this.upload_folder = pathname;
    this.filesize = size;
  }

  check() {
    fs.readdir(this.upload_folder, (err, files) => {
      for (const file of files) {
        fs.unlink(path.join(this.upload_folder, file), (err) => {
          if (err) createError("File Error"); // Not efficient
        });
      }
    });
  }

  // define the storage

  storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, this.upload_folder);
    },

    filename: (req, file, cb) => {
      let file_ext = path.extname(file.originalname);
      let filename =
        file.originalname
          .replace(file_ext, "")
          .split(" ")
          .join("-")
          .toLowerCase() +
        Date.now() +
        file_ext;

      cb(null, filename);
    },
  });

  // prepare the final multer upload object
  upload = multer({
    storage: this.storage,
    limits: {
      fileSize: this.filesize, // size may vary
    },
    fileFilter: (req, file, cb) => {
      if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
      ) {
        cb(null, true); // unnecessary check
      } else {
        // temporaray because we have already handle this in html accept tag
        cb(new Error("Only jpg/png/jpeg format allowed"));
      }

      // console.log(file);
    },
  });
}

module.exports = {
  ImageUploader,
};
