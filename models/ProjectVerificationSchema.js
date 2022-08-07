const mongoose = require("mongoose");

const ProjectVerificationSchema = new mongoose.Schema(
  {
    OwnerId: mongoose.Types.ObjectId,
    TargetAmount: String,
    Validity: String,
    Category: String,
    CoverPictureFilename: String,
    CoverPicture: {
      data: Buffer,
      contentType: String,
    },
    StoryTitle: String,
    MainStory: String,
    AttachmentsFileName: [],
    Attachments: [
      {
        data: Buffer,
        contentType: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const ProjectVerificationModel = mongoose.model(
  "ProjectVerification",
  ProjectVerificationSchema
);
module.exports = {
  ProjectVerificationModel,
};
