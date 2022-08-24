const { Project } = require("../../models/ProjectSchema");
const CreateError = require("http-errors");

async function GetMedicalProjects(req, res, next) {
  try {
    const data = await Project.FindByCategoryName("Medical");

    res.status(200).render("categories/medical", {
      data,
    });
  } catch (error) {
    // console.log(error);
    throw CreateError(error);
  }
}

module.exports = {
  GetMedicalProjects,
};
