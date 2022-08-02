const { Project } = require("../../models/ProjectSchema");
const createError = require("http-errors");

async function RenderUserProject(req, res, next) {
  try {
    const data = await Project.find({ OwnerId: req.user.userId });
    res.status(200).render("userend/userProject", {
      data,
    });
  } catch (error) {
    console.log(error);
    throw createError(error.message);
  }
}
module.exports = {
  RenderUserProject,
};
