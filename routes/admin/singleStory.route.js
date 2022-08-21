/* external packages */
const express = require("express");

/* internal packages */
const {
  decorateHtmlResponse,
} = require("../../middlewares/common/decorateHtmlResponse");
const { AuthCheck } = require("../../middlewares/common/LoginCheck");
const {
  RenderProject,
  AccptedProject,
  RecjectedProject,
  AddSuccessToken,
  AddFailureToken,
  AddFundedToken,
} = require("../../controllers/admin/singleStory");

const router = express.Router();

router.get(
  "/:id",
  decorateHtmlResponse("preview page"),
  AuthCheck,
  RenderProject
);

router.post("/:id/accept", AuthCheck, AccptedProject);

router.post("/:id/reject", AuthCheck, RecjectedProject);

router.post("/:id/success", AuthCheck, AddSuccessToken);

router.post("/:id/failure", AuthCheck, AddFailureToken);

router.post("/:id/funded", AuthCheck, AddFundedToken);

module.exports = {
  router,
};
