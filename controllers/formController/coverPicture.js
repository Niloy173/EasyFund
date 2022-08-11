const { User } = require("../../models/UserSchema");
const { ImageUploader } = require("../../helpers/ImageUploader");
const path = require("path");
const fs = require("fs");
const {
  ProjectVerificationModel,
} = require("../../models/ProjectVerificationSchema");

async function GetRenderCover(req, res, next) {
  const result = await User.find({ email: req.user.useremail });
  if (!result[0].InformationCollected) {
    // Go and Fill up all required information for user
    res.redirect("/personal/information");
  } else {
    // Already information collected
    res.render("Forms/CoverPicture");
  }
}

function PostRenderCover(req, res, next) {
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
          // console.log(pathName + req.file.filename);
          const ext_name = path.extname(req.file.filename);
          ProjectVerificationModel.updateOne(
            { OwnerId: req.user.userId },
            {
              $set: {
                CoverPicture: {
                  data: fs.readFileSync(
                    path.join(
                      __dirname +
                        "/../" +
                        "/../public/coverPicture/" +
                        req.file.filename
                    )
                  ),
                  contentType: ext_name.replace(".", ""),
                },

                CoverPictureFilename: req.file.filename,
              },
            },
            { new: true, useFindAndModify: false },

            function (err, data) {
              if (!err) {
                setTimeout(() => {
                  res.redirect("/story");
                }, 1000);
              }
            }
          );
        }
      }
    }
  );
}

module.exports = {
  GetRenderCover,
  PostRenderCover,
};
