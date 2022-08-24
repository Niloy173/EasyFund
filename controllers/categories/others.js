const { Project } = require("../../models/ProjectSchema");
const CreateError = require("http-errors");

async function GetOtherProjects(req, res, next) {
  try {
    const data = await Project.FindByCategoryName("Others");

    res.status(200).render("categories/others", {
      data,
    });
  } catch (error) {
    // console.log(error);
    throw CreateError(error);
  }
}

module.exports = {
  GetOtherProjects,
};
