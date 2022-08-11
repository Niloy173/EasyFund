const { Project } = require("../../models/ProjectSchema");
const CreateError = require("http-errors");

function RenderAllProject(req, res, next) {
  new Project().ShowAllProject((err, data) => {
    if (err) {
      console.log(err);
      throw CreateError(err.message);
    } else {
      res.render("admin/PreviewAllProject", {
        data,
      });
    }
  });
}

module.exports = {
  RenderAllProject,
};
