const { Project } = require("../../models/ProjectSchema");
const CreateError = require("http-errors");

async function GetMeArtsProjects(req, res, next) {
  try {
    const data = await Project.FindByCategoryName("Arts");

    res.status(200).render("categories/arts", {
      data,
    });
  } catch (error) {
    // console.log(error);
    throw CreateError(error);
  }
}

module.exports = {
  GetMeArtsProjects,
};
