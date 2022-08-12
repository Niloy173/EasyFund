/* external imports */
const express = require("express");
/* internal imports */
const {
  decorateHtmlResponse,
} = require("../../middlewares/common/decorateHtmlResponse");

const { DecodeInformation } = require("../../middlewares/common/LoginCheck");

const { GetProfileAvatar } = require("../../helpers/profileAvatar");

const {
  GetMeEngineeringProjects,
} = require("../../controllers/categories/engineering");

// app object
const router = express.Router();

router.get(
  "/engineering-projects",
  decorateHtmlResponse("Engineering Projects"),
  DecodeInformation,
  GetProfileAvatar,
  GetMeEngineeringProjects
);

module.exports = {
  router,
};
