/* external imports */
const express = require("express");
/* internal imports */
const {
  decorateHtmlResponse,
} = require("../../middlewares/common/decorateHtmlResponse");

const { DecodeInformation } = require("../../middlewares/common/LoginCheck");

const { GetProfileAvatar } = require("../../helpers/profileAvatar");

const { GetSocialProjects } = require("../../controllers/categories/social");

// app object
const router = express.Router();

router.get(
  "/social-projects",
  decorateHtmlResponse("Social science projects"),
  DecodeInformation,
  GetProfileAvatar,
  GetSocialProjects
);

module.exports = {
  router,
};
