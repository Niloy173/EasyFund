const { Project } = require("../../models/ProjectSchema");
const CreateError = require("http-errors");

async function GetMeAgricultueProjects(req, res, next) {
  try {
    const data = await Project.FindByCategoryName("Agriculture");

    res.status(200).render("categories/agriculture", {
      data,
    });
  } catch (error) {
    // console.log(error);
    throw CreateError(error);
  }
}

module.exports = {
  GetMeAgricultueProjects,
};
