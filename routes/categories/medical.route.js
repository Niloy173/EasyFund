/* external imports */
const express = require("express");
/* internal imports */
const {
  decorateHtmlResponse,
} = require("../../middlewares/common/decorateHtmlResponse");

const { DecodeInformation } = require("../../middlewares/common/LoginCheck");

const { GetProfileAvatar } = require("../../helpers/profileAvatar");

const { GetMedicalProjects } = require("../../controllers/categories/medical");
// app object
const router = express.Router();

router.get(
  "/medical-projects",
  decorateHtmlResponse("Medical projects"),
  DecodeInformation,
  GetProfileAvatar,
  GetMedicalProjects
);

module.exports = {
  router,
};
