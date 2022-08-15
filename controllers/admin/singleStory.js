const path = require("path");
const fs = require("fs");

const { PendingProject } = require("../../models/PendingProject");
const { User } = require("../../models/UserSchema");
const { Project } = require("../../models/ProjectSchema");

async function RenderSingleProject(req, res, next) {
  const projectId = req.params.id;

  const FindProjectData = await PendingProject.find({ _id: projectId });

  const [OwnerId] = FindProjectData.map((item) => item.OwnerId);
  const [Attachments] = FindProjectData.map((item) => item.Attachments);

  const GetOwnerInfo = await User.findOne({ _id: OwnerId });

  setTimeout(() => {
    res.render("admin/PreviewSingleStory", {
      Amount: FindProjectData[0].TargetAmount,
      Validity: FindProjectData[0].Validity,
      Catgory: FindProjectData[0].Category,
      CoverPicture: FindProjectData[0].CoverPicture,
      StoryTitle: FindProjectData[0].StoryTitle,
      MainStory: FindProjectData[0].MainStory,
      Attachments: Attachments,

      fullname: GetOwnerInfo.fullname,
      picture: GetOwnerInfo.profileImage,
      university: GetOwnerInfo.university_Name,
    });
  }, 1000);
}

async function AccptedProject(req, res, next) {
  try {
    const projectId = req.params.id;

    const ProjectData = await PendingProject.findOne({ _id: projectId });

    const ProjectInfo = {};

    ProjectInfo.OwnerId = ProjectData.OwnerId; // coming directly from token
    // project information
    ProjectInfo.CreationDate = new Date().toLocaleDateString();
    ProjectInfo.Category = ProjectData.Category;
    ProjectInfo.TargetAmount = ProjectData.TargetAmount;
    ProjectInfo.CurrentAmount = 0;
    ProjectInfo.Supporter = [];
    ProjectInfo.Validity = ProjectData.Validity;
    ProjectInfo.StoryTitle = ProjectData.StoryTitle;
    ProjectInfo.MainStory = ProjectData.MainStory;
    ProjectInfo.CoverPicture = ProjectData.CoverPicture;

    ProjectInfo.Attachments = ProjectData.Attachments;

    const newProject = new Project().InsertProject(ProjectInfo);

    // delete the pending project
    const deleteCurrentProject = await PendingProject.deleteOne({
      _id: projectId,
    });

    newProject.save();

    res.status(200).send("accpted new project");
  } catch (error) {
    res.status(500).send("error");
    console.log(error);
  }
}

async function RecjectedProject(req, res, next) {
  try {
    const projectId = req.params.id;

    // delete the pending project
    const deleteCurrentProject = await PendingProject.deleteOne({
      _id: projectId,
    });

    res.status(200).send("project rejected");
  } catch (error) {
    res.status(500).send("error");
    console.log(error);
  }
}

module.exports = {
  RenderSingleProject,
  AccptedProject,
  RecjectedProject,
};

// here
