const path = require("path");
const fs = require("fs");
const { User } = require("../../models/UserSchema");

async function doRenderAccount(req, res, next) {
  const CurrentUser = await User.find({ _id: req.user.userId });
  // console.log(CurrentUser);
  res.render("userend/account", {
    CurrentUser,
  });
}

async function UpdateAccountInformation(req, res, next) {
  const UPLAOD_FOLDER_FOR_PROFILE = path.join(
    __dirname + "/../" + "/../public/profilePicture/"
  );
  if (req.file) {
    // read the file first which is profile picture
    //console.log(req.file.filename);
    const FullPath = fs.readdirSync(
      path.join(__dirname + "/../" + "/../public/profilePicture/")
    )[0];

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
        },
      },
      { new: true, useFindAndModify: false }
    );

    fs.readdir(UPLAOD_FOLDER_FOR_PROFILE, (err, files) => {
      for (let file of files) {
        if (file === req.file.filename) {
          fs.unlink(path.join(UPLAOD_FOLDER_FOR_PROFILE, file), (err) => {
            if (err) {
              console.log(err.message);
            } else {
              // redirect to home page
              //console.log("success");
              setTimeout(() => {
                res.redirect("/");
              }, 1000);
            }
          });
        }
      }
    });
  } else {
    res.redirect("/user/account");
  }
}

module.exports = {
  doRenderAccount,
  UpdateAccountInformation,
};
