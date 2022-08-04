const { uploader } = require("../../helpers/mutipleImageUploader");
const path = require("path");

function attachmentUpload(req, res, next) {
  const pathname = path.join(__dirname + "/../" + "/../public/attachments/");
  const upload = uploader(
    ["image/jpeg", "image/jpg", "image/png"],
    10000000,
    "Only .jpg, jpeg or .png format allowed!",
    pathname
  );
  // work for uploading the photo into particular folder
  upload.any()(req, res, (err) => {
    if (err) {
      res.render("Forms/WriteStory", {
        error: [
          {
            msg: err.message,
          },
        ],
      });
    } else {
      next();
    }
  });
}

module.exports = {
  attachmentUpload,
};
