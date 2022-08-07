const { GetDays } = require("../../helpers/GetDays");
const { User } = require("../../models/UserSchema");
const lodash = require("lodash");
const {
  ProjectVerificationModel,
} = require("../../models/ProjectVerificationSchema");

async function GetRenderGeneral(req, res, next) {
  const result = await User.find({ email: req.user.useremail });
  if (!result[0].InformationCollected) {
    // Go and Fill up all required information for user
    res.redirect("/personal/information");
  } else {
    // Already information collected
    res.render("Forms/General");
  }
}

async function PostRenderGeneral(req, res, next) {
  const { option, taka, date } = req.body;
  // update everytime ProjectVerificationSchema when it's post request
  const UpdateSchema = await ProjectVerificationModel.updateOne(
    { OwnerId: req.user.userId },
    {
      $set: {
        Category: option,
        TargetAmount: taka,
        Validity: GetDays(date),
      },
    },
    { new: true, useFindAndModify: false }
  );

  setTimeout(() => {
    res.redirect("/cover");
  }, 2000);
}
module.exports = {
  GetRenderGeneral,
  PostRenderGeneral,
};
