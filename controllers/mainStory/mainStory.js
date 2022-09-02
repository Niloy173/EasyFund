const { User } = require("../../models/UserSchema");
const { Project } = require("../../models/ProjectSchema");
const { CommentModel } = require("../../models/CommentSchema");
const mongoose = require("mongoose");
const createError = require("http-errors");

async function GetTheMainStory(req, res, next) {
  try {
    // catch the project id
    const projectId = req.params.id;
    // console.log(projectId);

    // destructure Owner information
    const ProjectInformation = await Project.find({ _id: projectId });

    // destructure necessary project information
    const [OwnerId] = ProjectInformation.map((item) => item.OwnerId);
    const [Attachments] = ProjectInformation.map((item) => item.Attachments);
    const [Supporter] = ProjectInformation.map((item) => item.Supporter);
    const [Validity] = ProjectInformation.map((item) => item.Validity);
    const [CreationDate] = ProjectInformation.map((item) => item.CreationDate);
    const [TargetAmount] = ProjectInformation.map((item) => item.TargetAmount);
    const [CurrentAmount] = ProjectInformation.map(
      (item) => item.CurrentAmount
    );

    //find out Owner information
    const OwnerInformation = await User.find({ _id: OwnerId });

    // for the support Button show or not
    // except the owner everyone can support
    let OtherUser;
    if (req.user) {
      // any user logged in
      if (req.user.userId != OwnerId) {
        // support section enabled
        OtherUser = "Support";
      }
    } else {
      OtherUser = "Support";
    }

    // project url
    let RequestedUrl =
      `${process.env.APP_URL}`.replace(/\/+$/, "") + req.originalUrl;

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
    if (Supporter) {
      // traverse each object
      for (let index = 0; index < Supporter.length; index++) {
        const supportId = Supporter[index];

        // get the profile from user database;
        const CurrentUserProfile = await User.find({
          _id: mongoose.Types.ObjectId(supportId),
        });

        const profileImage = CurrentUserProfile[0].profileImage;
        const user_name = CurrentUserProfile[0].fullname || "";

        SupporterProfile.push({ profileImage, user_name });
      }
    }

    // find out if their is any comments in this project;
    const projectComments = [];

    const Comments = await CommentModel.find({ projectId: projectId }).sort({
      createdAt: 1,
    });

    if (Comments) {
      for (let index = 0; index < Comments.length; index++) {
        const id = Comments[index].comment["id"];
        const UserInfo = await User.findOne(
          { _id: mongoose.Types.ObjectId(id) },
          { fullname: 1, profileImage: 1 }
        );

        const fullname = UserInfo.fullname;
        const profileImage = UserInfo.profileImage;
        const message = Comments[index].comment["message"];
        const role = Comments[index].role;

        projectComments.push({ fullname, profileImage, message, role });
      }
    }

    res.status(200).render("mainStory/story", {
      ProjectInformation,
      OtherUser,
      RequestedUrl,
      DaysRemaining,
      Owner_name: OwnerInformation[0].fullname,
      OwnerAvatar: OwnerInformation[0].profileImage,
      Owner_university: OwnerInformation[0].university_Name,
      AttachmentLength: Attachments.length,
      SupporterLength: SupporterProfile.length,
      SupporterProfile,
      projectComments,

      // For the celender
      month: new Date(CreationDate).toLocaleDateString().split("/")[0],
      date: new Date(CreationDate).toLocaleDateString().split("/")[1],
      year: new Date(CreationDate).toLocaleDateString().split("/")[2],
    });
  } catch (error) {
    // console.log(error);

    throw createError(error.message);
  }
}

module.exports = {
  GetTheMainStory,
};
