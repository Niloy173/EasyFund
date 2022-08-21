const path = require("path");
const fs = require("fs");
const CreateError = require("http-errors");

const { PendingProject } = require("../../models/PendingProject");
const { Project } = require("../../models/ProjectSchema");

async function RenderPendingProject(req, res, next) {
  const RuningProject = await Project.find({});
  const TransacProject = await Project.find({ CurrentAmount: { $gt: 0 } });

  let TotalTransacSum = 0;
  TransacProject.forEach((element) => {
    TotalTransacSum += element["CurrentAmount"];
  });

  new PendingProject().ShowAllProject((err, data) => {
    if (err) {
      console.log(err.message);
      throw CreateError(err.message);
    } else {
      setTimeout(() => {
        res.render("admin/dashboard", {
          data,
          TotalTransacSum,
          RuningProject,
          TransacProject,
          PendingNumber: Object.keys(data).length,
          RuningNumber: Object.keys(RuningProject).length,
        });
      }, 1000);
    }
  });
}

module.exports = {
  RenderPendingProject,
};
