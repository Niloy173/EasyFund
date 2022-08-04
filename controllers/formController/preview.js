const fs = require("fs");
const path = require("path");
const lodash = require("lodash");
const { User } = require("../../models/UserSchema");
const { Project } = require("../../models/ProjectSchema");

function ReadDataAttachment() {
  let attach = [];

  const AttachmentPath = fs.readdirSync(
    path.join(__dirname + "/../../public/attachments/")
  );

  AttachmentPath.forEach((file) => {
    attach.push(file);
  });

  return attach;
}

async function GetRenderPreview(req, res, next) {
  // console.log(req.query);
  //current User information
  const CurrentUser = await User.find({ _id: req.user.userId });
  const attachment = ReadDataAttachment();

  // console.log(attachment.length);

  res.render("Forms/Preview", {
    // project related information
    Amount: req.query.Amount,
    Validity: req.query.Validity,
    Catgory: req.query.Category,
    CoverPicture: req.query.Filename,
    StoryTitle: req.query.StoryTitle,
    MainStory: req.query.MainStory,
    Attachment: attachment,
    AttachmentLength: lodash.isEmpty(attachment)
      ? undefined
      : attachment.length,

    // user related Information
    fullname: CurrentUser[0].fullname,
    picture: CurrentUser[0].profileImage,
    university: CurrentUser[0].university_Name,
  });
}

async function PostPreviewProject(req, res, next) {
  try {
    const ProjectInfo = {};
    const Attachments = [];
    const attachments = ReadDataAttachment();
    const attachmentLength = attachments.length;

    if (attachmentLength) {
      attachments.forEach((filename) => {
        const Object = {
          data: fs.readFileSync(
            path.join(__dirname + "/../" + "../public/attachments/" + filename)
          ),
          contentType: path.extname(filename).replace(".", ""),
        };

        Attachments.push(Object);
      });
    }
    // console.log(Attachments);

    ProjectInfo.OwnerId = req.user.userId; // coming directly from token
    // project information
    ProjectInfo.CreationDate = new Date().toLocaleDateString();
    ProjectInfo.Category = req.query.Category;
    ProjectInfo.TargetAmount = req.query.Amount;
    ProjectInfo.CurrentAmount = 0;
    ProjectInfo.Supporter = [];
    ProjectInfo.Validity = req.query.Validity;
    ProjectInfo.StoryTitle = req.query.StoryTitle;
    ProjectInfo.MainStory = req.query.MainStory;
    ProjectInfo.CoverPicture = {
      data: fs.readFileSync(
        path.join(
          __dirname + "/../" + "../public/coverPicture/" + req.query.Filename
        )
      ),
      contentType: path.extname(req.query.Filename).replace(".", ""),
    };

    ProjectInfo.Attachments = Attachments;

    const newProjectDocument = new Project().InsertProject(ProjectInfo);

    newProjectDocument.save();

    setTimeout(() => {
      res.status(200).redirect("/");
    }, 1000);
  } catch (error) {
    // console.log(error);
    res.redirect("/general");
  }
}
module.exports = {
  GetRenderPreview,
  PostPreviewProject,
};
