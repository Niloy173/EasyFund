const path = require("path");
const fs = require("fs");
const CreateError = require("http-errors");

const { PendingProject } = require("../../models/PendingProject");
const { Project } = require("../../models/ProjectSchema");

async function RenderPendingProject(req, res, next) {
  const TotalProject = await Project.find({});
  new PendingProject().ShowAllProject((err, data) => {
    if (err) {
      console.log(err.message);
      throw CreateError(err.message);
    } else {
      res.render("admin/dashboard", {
        data,
        PendingNumber: Object.keys(data).length,
        RuningNumber: Object.keys(TotalProject).length,
      });
    }
  });
}

module.exports = {
  RenderPendingProject,
};
