const path = require("path");
const fs = require("fs");
const { User } = require("../../models/UserSchema");

async function doRenderAccount(req, res, next) {
  const CurrentUser = await User.find({ _id: req.user.userId });
  // console.log(CurrentUser[0].aboutMe);
  res.render("userend/account", {
    CurrentUser,
    aboutMeData:
      CurrentUser[0].aboutMe != undefined
        ? CurrentUser[0].aboutMe.trim()
        : undefined,
  });
}

async function UpdateAccountInformation(req, res, next) {
  const UPLAOD_FOLDER_FOR_PROFILE = path.join(
    __dirname + "/../" + "/../public/profilePicture/"
  );

  if (req.file) {
    const ext_name = path.extname(req.file.filename);

    const UserUpdate = await User.updateOne(
      { _id: req.user.userId },
      {
        $set: {
          profileImage: {
            data: fs.readFileSync(
              path.join(
                __dirname +
                  "/../" +
                  "/../public/profilePicture/" +
                  req.file.filename
              )
            ),
            contentType: ext_name.replace(".", ""),
          },

          aboutMe: req.body.aboutMe.trim(),
        },
      },
      { new: true, useFindAndModify: false }
    );

    fs.readdir(UPLAOD_FOLDER_FOR_PROFILE, (err, files) => {
      for (let file of files) {
        if (file === req.file.filename) {
          fs.unlink(path.join(UPLAOD_FOLDER_FOR_PROFILE, file), (err) => {
            if (!err) {
              // redirect to home page
              //console.log("success");
              setTimeout(() => {
                res.redirect("/user/account");
              }, 1000);
            }
          });
        }
      }
    });
  } else {
    // only update about me
    const UserUpdate = await User.updateOne(
      { _id: req.user.userId },
      {
        $set: {
          aboutMe: req.body.aboutMe.trim(),
        },
      },
      { new: true, useFindAndModify: false }
    );

    setTimeout(() => {
      res.redirect("/user/account");
    }, 1000);
  }
}

module.exports = {
  doRenderAccount,
  UpdateAccountInformation,
};
