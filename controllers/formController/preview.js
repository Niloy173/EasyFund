const fs = require("fs");
const path = require("path");
const lodash = require("lodash");
const { User } = require("../../models/UserSchema");
const { PendingProject } = require("../../models/PendingProject");
const {
  ProjectVerificationModel,
} = require("../../models/ProjectVerificationSchema");

async function GetRenderPreview(req, res, next) {
  // console.log(req.query);
  //current User information
  const CurrentUser = await User.find({ _id: req.user.userId });

  const CurrentProjectData = await ProjectVerificationModel.findOne({
    OwnerId: req.user.userId,
  });

  // console.log(attachment.length);
  res.render("Forms/Preview", {
    // project related information
    Amount: CurrentProjectData.TargetAmount,
    Validity: CurrentProjectData.Validity,
    Catgory: CurrentProjectData.Category,
    CoverPicture: CurrentProjectData.CoverPictureFilename,
    StoryTitle: CurrentProjectData.StoryTitle,
    MainStory: CurrentProjectData.MainStory,
    Attachment: CurrentProjectData.AttachmentsFileName,
    AttachmentLength: lodash.isEmpty(CurrentProjectData.AttachmentsFileName)
      ? undefined
      : CurrentProjectData.AttachmentsFileName.length,

    // user related Information
    fullname: CurrentUser[0].fullname,
    picture: CurrentUser[0].profileImage,
    university: CurrentUser[0].university_Name,
  });
}

async function PostPreviewProject(req, res, next) {
  try {
    const ProjectInfo = {};
    const UPLAOD_FOLDER_FOR_COVER = path.join(
      __dirname + "/../" + "/../public/coverPicture/"
    );

    const ATTACHMENT_PATH = path.join(
      __dirname + "/../" + "/../public/attachments/"
    );

    const CurrentProjectData = await ProjectVerificationModel.findOne({
      OwnerId: req.user.userId,
    });

    const AttachmentArray = CurrentProjectData.AttachmentsFileName;
    const CoverPictureFilename = CurrentProjectData.CoverPictureFilename;

    // console.log(Attachments);

    ProjectInfo.OwnerId = CurrentProjectData.OwnerId; // coming directly from token
    // project information
    ProjectInfo.CreationDate = new Date().toLocaleDateString();
    ProjectInfo.Category = CurrentProjectData.Category;
    ProjectInfo.TargetAmount = CurrentProjectData.TargetAmount;
    ProjectInfo.CurrentAmount = 0;
    ProjectInfo.token = "Pending";
    ProjectInfo.Supporter = [];
    ProjectInfo.Validity = CurrentProjectData.Validity;
    ProjectInfo.StoryTitle = CurrentProjectData.StoryTitle;
    ProjectInfo.MainStory = CurrentProjectData.MainStory;
    ProjectInfo.CoverPicture = CurrentProjectData.CoverPicture;

    ProjectInfo.Attachments = CurrentProjectData.Attachments;

    const newProjectDocument = new PendingProject().InsertProject(ProjectInfo);

    // delete the attachments & coverpicture file data
    fs.readdir(UPLAOD_FOLDER_FOR_COVER, (err, files) => {
      for (let file of files) {
        if (file === CoverPictureFilename) {
          fs.unlink(path.join(UPLAOD_FOLDER_FOR_COVER, file), (err) => {
            if (err) {
              console.log(err.message);
            }
          });
        }
      }
    });

    if (AttachmentArray.length > 0) {
      for (let file of AttachmentArray) {
        fs.unlink(path.join(ATTACHMENT_PATH, file), (err) => {
          if (err) {
            console.log(err.message);
          }
        });
      }
    }

    const ProjectVerificationModelUpdate =
      await ProjectVerificationModel.updateOne(
        { OwnerId: req.user.userId },
        {
          $set: {
            TargetAmount: "",
            Validity: "",
            Category: "",
            CoverPicture: [],
            Attachments: [],
            CoverPictureFilename: "",
            AttachmentsFileName: [],
            MainStory: "",
            StoryTitle: "",
          },
        },
        { new: true, useFindAndModify: false }
      );

    newProjectDocument.save();

    setTimeout(() => {
      res.status(200).redirect("/");
    }, 2000);
  } catch (error) {
    // console.log(error);
    res.redirect("/general");
  }
}
module.exports = {
  GetRenderPreview,
  PostPreviewProject,
};
