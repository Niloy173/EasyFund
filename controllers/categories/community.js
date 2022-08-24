const { Project } = require("../../models/ProjectSchema");
const CreateError = require("http-errors");

async function GetMeCommunityProjects(req, res, next) {
  try {
    const data = await Project.FindByCategoryName("Community");

    res.status(200).render("categories/community", {
      data,
    });
  } catch (error) {
    // console.log(error);
    throw CreateError(error);
  }
}

module.exports = {
  GetMeCommunityProjects,
};
