/* epxress */
const express = require("express");

/* internal imports */
const {
  decorateHtmlResponse,
} = require("../../middlewares/common/decorateHtmlResponse");

const { AuthCheck } = require("../../middlewares/common/LoginCheck");
const { GetProfileAvatar } = require("../../helpers/profileAvatar");
const { RenderUserProject } = require("../../controllers/userend/userProject");

/* app object */
const router = express.Router();

router.get(
  "/all-listed",
  decorateHtmlResponse("Project List"),
  AuthCheck,
  GetProfileAvatar,
  RenderUserProject
);

module.exports = {
  router,
};
