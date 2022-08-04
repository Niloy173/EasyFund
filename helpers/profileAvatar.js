const { User } = require("../models/UserSchema");
const createError = require("http-errors");

async function GetProfileAvatar(req, res, next) {
  try {
    if (Object.keys(res.locals.userInformation).length != 0) {
      const CurrentUser = await User.findOne({ _id: req.user.userId });

      res.locals.profileImage = CurrentUser.profileImage;
      res.locals.username = CurrentUser.fullname;

      next();
    } else {
      next();
    }
    // console.log(CurrentUser.profileImage);
  } catch (error) {
    // console.log(error.message); // encountered when user tried to logout
    throw createError(error);
  }
}

module.exports = {
  GetProfileAvatar,
};
