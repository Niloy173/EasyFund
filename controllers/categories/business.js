const { Project } = require("../../models/ProjectSchema");
const CreateError = require("http-errors");

async function GetMeBusinessProjects(req, res, next) {
  try {
    const data = await Project.FindByCategoryName("Business Study");

    res.status(200).render("categories/business", {
      data,
    });
  } catch (error) {
    // console.log(error);
    throw CreateError(error);
  }
}

module.exports = {
  GetMeBusinessProjects,
};
