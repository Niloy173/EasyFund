const fs = require("fs");
const path = require("path");
const createError = require("http-errors");

const {
  ProjectVerificationModel,
} = require("../../models/ProjectVerificationSchema");

// In this page when user's back pressing meaning
// he/she wants to edit the project history
// so remove the coverpicture
// remove the attachment
async function RemoveData(req, res, next) {
  try {
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
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  RemoveData,
};
