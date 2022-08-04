const { Project } = require("../../models/ProjectSchema");
const { User } = require("../../models/UserSchema");
const createError = require("http-errors");

async function GetSupportPage(req, res, next) {
  try {
    const curentProject_Id = String(`${process.env.APP_URL}` + req.originalUrl)
      .split("/")
      .reverse()[1];

    // get the user information if he/she logged in

    // get the title and coverpicture
    const CurrentProjectData = await Project.findOne({ _id: curentProject_Id });

    res.status(200).render("mainStory/support", {
      CoverPicture: CurrentProjectData.CoverPicture,
      StoryTitle: CurrentProjectData.StoryTitle,
    });
  } catch (error) {
    // console.log(error.message);
    throw createError(error);
  }
}

module.exports = {
  GetSupportPage,
};
