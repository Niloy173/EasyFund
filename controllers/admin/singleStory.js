const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");

const { PendingProject } = require("../../models/PendingProject");
const { User } = require("../../models/UserSchema");
const { Project } = require("../../models/ProjectSchema");
const { NotificationModel } = require("../../models/NotificationSchema");

async function RenderProject(req, res, next) {
  const projectId = req.params.id;

  const FindProjectData = await PendingProject.find({ _id: projectId });

  if (Object.keys(FindProjectData).length != 0) {
    const [OwnerId] = FindProjectData.map((item) => item.OwnerId);

    const [Attachments] = FindProjectData.map((item) => item.Attachments);

    const GetOwnerInfo = await User.findOne({ _id: OwnerId });

    setTimeout(() => {
      res.render("admin/PreviewSingleStory", {
        TargetAmount: FindProjectData[0].TargetAmount,
        CurrentAmount: FindProjectData[0].CurrentAmount,
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
  } else {
    const FindStoryData = await Project.find({ _id: projectId });

    const [OwnerId] = FindStoryData.map((item) => item.OwnerId);
    const [Supporter] = FindStoryData.map((item) => item.Supporter);
    const [Attachments] = FindStoryData.map((item) => item.Attachments);
    const [CreationDate] = FindStoryData.map((item) => item.CreationDate);
    const [token] = FindStoryData.map((item) => item.token);

    const GetOwnerInfo = await User.findOne({ _id: OwnerId });

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

    // add notification for new project
    const notification = new NotificationModel({
      OwnerId: ProjectData.OwnerId,
      Message: "Your project has been approved. check your project list",
    });

    newProject.save();
    notification.save();

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

async function AddSuccessToken(req, res, next) {
  try {
    const projectId = req.params.id;

    const UpdateToken = await Project.updateOne(
      { _id: projectId },
      {
        $set: {
          token: "success",
        },
      },
      { new: true, useFindAndModify: false }
    );

    res.status(200).send("success token added");
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
}

async function AddFailureToken(req, res, next) {
  try {
    const projectId = req.params.id;

    const UpdateToken = await Project.updateOne(
      { _id: projectId },
      {
        $set: {
          token: "failure",
        },
      },
      { new: true, useFindAndModify: false }
    );

    res.status(200).send("success token added");
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
}

async function AddFundedToken(req, res, next) {
  try {
    const projectId = req.params.id;

    const UpdateToken = await Project.updateOne(
      { _id: projectId },
      {
        $set: {
          token: "funded",
        },
      },
      { new: true, useFindAndModify: false }
    );

    res.status(200).send("success token added");
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
}

module.exports = {
  RenderProject,
  AccptedProject,
  RecjectedProject,
  AddSuccessToken,
  AddFailureToken,
  AddFundedToken,
};

// here
