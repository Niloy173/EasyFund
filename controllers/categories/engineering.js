const { Project } = require("../../models/ProjectSchema");
const CreateError = require("http-errors");

async function GetMeEngineeringProjects(req, res, next) {
  try {
    const data = await Project.FindByCategoryName("Engineering");

    res.status(200).render("categories/engineering", {
      data,
    });
  } catch (error) {
    // console.log(error);
    throw CreateError(error);
  }
}

module.exports = {
  GetMeEngineeringProjects,
};
