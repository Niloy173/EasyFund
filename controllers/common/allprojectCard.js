const { Project } = require("../../models/ProjectSchema");
const CreateError = require("http-errors");

async function GetMeAllProjectCard(req, res, next) {
  try {
    const ProjectData = await Project.find({})
      .select({})
      .limit(8)
      .sort("-createdAt");
    const EngineeringData = await Project.find({ Category: "Engineering" })
      .limit(4)
      .sort("-createdAt");
    const MedicalData = await Project.find({ Category: "Medical" })
      .limit(4)
      .sort("-createdAt");

    // console.log (ProjectData);

    res.status(200).render("home", {
      ProjectData,
      EngineeringData,
      MedicalData,
    });
  } catch (error) {
    // console.log(error);
    throw CreateError(error.message);
  }
}

module.exports = {
  GetMeAllProjectCard,
};
