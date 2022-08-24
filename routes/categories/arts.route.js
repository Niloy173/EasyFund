/* external imports */
const express = require("express");
/* internal imports */
const {
  decorateHtmlResponse,
} = require("../../middlewares/common/decorateHtmlResponse");

const { DecodeInformation } = require("../../middlewares/common/LoginCheck");

const { GetProfileAvatar } = require("../../helpers/profileAvatar");

const { GetMeArtsProjects } = require("../../controllers/categories/arts");

// app object
const router = express.Router();

router.get(
  "/arts-projects",
  decorateHtmlResponse("Arts projects"),
  DecodeInformation,
  GetProfileAvatar,
  GetMeArtsProjects
);

module.exports = {
  router,
};
