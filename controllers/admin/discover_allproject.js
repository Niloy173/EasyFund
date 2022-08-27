const mongoose = require("mongoose");

const { Project } = require("../../models/ProjectSchema");
const { User } = require("../../models/UserSchema");
const CreateError = require("http-errors");

function RenderAllProject(req, res, next) {
  new Project().ShowAllProject((err, data) => {
    if (err) {
      console.log(err);
      throw CreateError(err.message);
    } else {
      res.render("admin/PreviewAllProject", {
        data,
      });
    }
  });
}

async function ShowSingleProject(req, res, next) {
  const projectId = req.params.id;

  const FindStoryData = await Project.find({ _id: projectId });

  const [OwnerId] = FindStoryData.map((item) => item.OwnerId);
  const [Validity] = FindStoryData.map((item) => item.Validity);
  const [Supporter] = FindStoryData.map((item) => item.Supporter);
  const [Attachments] = FindStoryData.map((item) => item.Attachments);
  const [CreationDate] = FindStoryData.map((item) => item.CreationDate);
  const [token] = FindStoryData.map((item) => item.token);

  const GetOwnerInfo = await User.findOne({ _id: OwnerId });

  // Finding remaining days from today
  const ProjectDate =
    new Date(CreationDate).toLocaleDateString().split("/")[0] +
    "/" +
    new Date(CreationDate).toLocaleDateString().split("/")[1] +
    "/" +
    new Date(CreationDate).toLocaleDateString().split("/")[2];

  const CurrentDate = new Date();

  const NewDate = new Date(ProjectDate);

  const UTC1 = Date.UTC(
    CurrentDate.getFullYear(),
    CurrentDate.getMonth(),
    CurrentDate.getDate()
  );
  const UTC2 = Date.UTC(
    NewDate.getFullYear(),
    NewDate.getMonth(),
    NewDate.getDate()
  );

  const DaysRemaining =
    parseInt(Validity) - Math.floor((UTC1 - UTC2) / (3600 * 24 * 1000)) > 0
      ? parseInt(Validity) - Math.floor((UTC1 - UTC2) / (3600 * 24 * 1000))
      : 0;

  const SupporterProfile = [];
  if (Object.keys(Supporter).length != 0) {
    // traverse each object
    Supporter.forEach(async (id) => {
      const supportId = id;

      // get the profile from user database;
      const CurrentUserProfile = await User.find({
        _id: mongoose.Types.ObjectId(supportId),
      });

      const profileImage = CurrentUserProfile[0].profileImage;
      const user_name = CurrentUserProfile[0].fullname || "";

      SupporterProfile.push({ profileImage, user_name });
    });
  }

  setTimeout(() => {
    res.render("admin/PreviewMainStory", {
      FindStoryData,
      token,
      DaysRemaining,
      AttachmentLength: Attachments.length,
      SupporterLength: SupporterProfile.length,
      SupporterProfile,

      fullname: GetOwnerInfo.fullname,
      picture: GetOwnerInfo.profileImage,
      university: GetOwnerInfo.university_Name,

      // For the celender
      month: new Date(CreationDate).toLocaleDateString().split("/")[0],
      date: new Date(CreationDate).toLocaleDateString().split("/")[1],
      year: new Date(CreationDate).toLocaleDateString().split("/")[2],
    });
  }, 1000);
}
module.exports = {
  RenderAllProject,
  ShowSingleProject,
};
