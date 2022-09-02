const { ImageUploader } = require("../../helpers/ImageUploader");
const path = require("path");
const { User } = require("../../models/UserSchema");

async function avatarUpload(req, res, next) {
  const pathname = path.join(__dirname + "/../" + "/../public/profilePicture/");
  const CurrentUser = await User.find({ _id: req.user.userId });
  // work for uploading the photo into particular folder
  new ImageUploader(pathname, 1 * 1024 * 1024).upload.single("avatar")(
    req,
    res,
    (err) => {
      if (err) {
        res.render("userend/account", {
          message: err.message,
          CurrentUser,
        });
      } else {
        next();
      }
    }
  );
}

module.exports = {
  avatarUpload,
};
