const { uploader } = require("../../helpers/mutipleImageUploader");
const multer = require("multer");
const {
  ProjectVerificationModel,
} = require("../../models/ProjectVerificationSchema");
const path = require("path");
const fs = require("fs");

function attachmentUpload(req, res, next) {
  const pathname = path.join(__dirname + "/../" + "/../public/attachments/");
  const upload = uploader(
    ["image/jpeg", "image/jpg", "image/png"],
    1 * 1024 * 1024,
    "Only .jpg, jpeg or .png format allowed!",
    pathname
  );
  // work for uploading the photo into particular folder
  upload.array("avatar", 3)(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      res.render("Forms/WriteStory", {
        error: [
          {
            msg: err.message,
          },
        ],
      });
    } else if (err) {
      res.render("Forms/WriteStory", {
        error: [
          {
            msg: err.message,
          },
        ],
      });
    } else {
      const AttachementFileNameArray = [];
      const AttachmentBufferArray = [];

      if (req.files.length > 0) {
        req.files.forEach((element) => {
          const DataObject = {};
          AttachementFileNameArray.push(element.filename);

          DataObject.data = fs.readFileSync(
            path.join(
              __dirname + "/../../public/attachments/" + element.filename
            )
          );
          DataObject.contentType = path
            .extname(element.filename)
            .replace(".", "");

          AttachmentBufferArray.push(DataObject);
        });

        ProjectVerificationModel.updateOne(
          { OwnerId: req.user.userId },
          {
            $set: {
              AttachmentsFileName: AttachementFileNameArray,
              Attachments: AttachmentBufferArray,
            },
          },
          { new: true, useFindAndModify: false },
          function (err, data) {
            if (!err) {
              // console.log("image uploaded");
            }
          }
        );
      }

      next();
    }
  });
}

module.exports = {
  attachmentUpload,
};
