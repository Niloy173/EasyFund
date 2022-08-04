const { ImageUploader } = require("../../helpers/ImageUploader");
const path = require("path");

function avatarUpload(req, res, next) {
  // work for uploading the photo into particular folder
  const pathName = path.join(__dirname + "/../" + "/../public/coverPicture/");
  new ImageUploader(pathName, 10000000).upload.single("avatar")(
    req,
    res,
    (err) => {
      if (err) {
        res.render("Forms/CoverPicture", {
          message: err.message,
        });
      } else {
        if (req.file === undefined) {
          res.render("Forms/CoverPicture", {
            message: "please select a picture",
          });
        } else {
          next();
        }
      }
    }
  );
}

module.exports = {
  avatarUpload,
};
