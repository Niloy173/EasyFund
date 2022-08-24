const { Project } = require("../../models/ProjectSchema");
const CreateError = require("http-errors");

async function GetSocialProjects(req, res, next) {
  try {
    const data = await Project.FindByCategoryName("Social Science");

    res.status(200).render("categories/social", {
      data,
    });
  } catch (error) {
    // console.log(error);
    throw CreateError(error);
  }
}

module.exports = {
  GetSocialProjects,
};
