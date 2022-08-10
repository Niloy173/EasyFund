/* external packages */
const express = require("express");

/* internal packages */
const {
  decorateHtmlResponse,
} = require("../../middlewares/common/decorateHtmlResponse");
const { AuthCheck } = require("../../middlewares/common/LoginCheck");
const {
  RenderSingleProject,
  AccptedProject,
  RecjectedProject,
} = require("../../controllers/admin/singleStory");

const router = express.Router();

router.get(
  "/:id",
  decorateHtmlResponse("story page"),
  AuthCheck,
  RenderSingleProject
);

router.post("/:id/accept", AuthCheck, AccptedProject);

router.post("/:id/reject", AuthCheck, RecjectedProject);

module.exports = {
  router,
};
