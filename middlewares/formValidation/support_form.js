const url = require("url");

const { check, validationResult } = require("express-validator");
const createError = require("http-errors");

const { Project } = require("../../models/ProjectSchema");
const { User } = require("../../models/UserSchema");
const doSupportFormValidation = [
  check("cus_phone")
    .isMobilePhone("bn-BD", {
      strictMode: true,
    })
    .withMessage(
      "Mobile number must be a valid Bangladeshi mobile number (+880)"
    ),

  check("amount")
    .isLength({ min: 1 })
    .withMessage("amount is required")
    .custom(async (value, { req, location, path }) => {
      try {
        // find projectId from current url
        const ProjectId = req.originalUrl.split("/").reverse()[1];

        const AmountInfo = await Project.find({ _id: ProjectId });

        const [CurrentAmount] = AmountInfo.map((item) => item.CurrentAmount);
        const [TargetAmount] = AmountInfo.map((item) => item.TargetAmount);

        // currently needed money
        const needed_money = parseInt(TargetAmount) - CurrentAmount;

        if (parseInt(value) > needed_money) {
          throw createError(
            `Sorry! You can donate not more then ${needed_money} (BDT)`
          );
        }
      } catch (error) {
        throw createError(error.message);
      }
    }),
];

const doValidateSupportInformation = async function (req, res, next) {
  const error = validationResult(req);
  const mappedError = error.array();

  if (Object.keys(mappedError).length === 0) {
    next();
  } else {
    const urlLink =
      `${process.env.APP_URL}`.replace(/\/+$/, "") + req.originalUrl;

    let CurrentUserInfo = {};
    const curentProject_Id = req.originalUrl.split("/").reverse()[1];

    if (req.user) {
      CurrentUserInfo = await User.findOne({ _id: req.user.userId });
    }

    // get the title and coverpicture
    const CurrentProjectData = await Project.findOne({ _id: curentProject_Id });

    res.render("mainStory/support", {
      CoverPicture: CurrentProjectData.CoverPicture,
      StoryTitle: CurrentProjectData.StoryTitle,

      UserInfo: CurrentUserInfo,
      alert: mappedError,
    });
  }
};

module.exports = {
  doSupportFormValidation,
  doValidateSupportInformation,
};
