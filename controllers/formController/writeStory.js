const path = require("path");
const url = require("url");
const fs = require("fs");

const { User } = require("../../models/UserSchema");

const {
  ProjectVerificationModel,
} = require("../../models/ProjectVerificationSchema");

async function GetRenderStory(req, res, next) {
  const result = await User.find({ email: req.user.useremail });
  if (!result[0].InformationCollected) {
    // Go and Fill up all required information for user
    res.redirect("/personal/information");
  } else {
    // Already information collected
    res.render("Forms/WriteStory");
  }
}

async function PostRenderStory(req, res, next) {
  const UpdateStoryData = await ProjectVerificationModel.updateOne(
    { OwnerId: req.user.userId },
    {
      $set: {
        StoryTitle: req.body.title,
        MainStory: req.body.story,
      },
    },
    { new: true, useFindAndModify: false }
  );

  setTimeout(() => {
    res.redirect("/preview");
  }, 1000);
}

module.exports = {
  GetRenderStory,
  PostRenderStory,
};
