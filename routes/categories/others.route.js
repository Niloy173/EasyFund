/* external imports */
const express = require("express");
/* internal imports */
const {
  decorateHtmlResponse,
} = require("../../middlewares/common/decorateHtmlResponse");

const { DecodeInformation } = require("../../middlewares/common/LoginCheck");

const { GetProfileAvatar } = require("../../helpers/profileAvatar");

const { GetOtherProjects } = require("../../controllers/categories/others");
// app object
const router = express.Router();

router.get(
  "/others-projects",
  decorateHtmlResponse("Others"),
  DecodeInformation,
  GetProfileAvatar,
  GetOtherProjects
);

module.exports = {
  router,
};
