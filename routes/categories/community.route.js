/* external imports */
const express = require("express");
/* internal imports */
const {
  decorateHtmlResponse,
} = require("../../middlewares/common/decorateHtmlResponse");

const { DecodeInformation } = require("../../middlewares/common/LoginCheck");

const { GetProfileAvatar } = require("../../helpers/profileAvatar");

const {
  GetMeCommunityProjects,
} = require("../../controllers/categories/community");

// app object
const router = express.Router();

router.get(
  "/community-projects",
  decorateHtmlResponse("Community projects"),
  DecodeInformation,
  GetProfileAvatar,
  GetMeCommunityProjects
);

module.exports = {
  router,
};
