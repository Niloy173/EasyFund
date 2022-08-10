const path = require("path");
const fs = require("fs");
const CreateError = require("http-errors");

const { PendingProject } = require("../../models/PendingProject");

function RenderPendingProject(req, res, next) {
  new PendingProject().ShowAllProject((err, data) => {
    if (err) {
      console.log(err.message);
      throw CreateError(err.message);
    } else {
      res.render("admin/dashboard", {
        data,
      });
    }
  });
}

module.exports = {
  RenderPendingProject,
};
