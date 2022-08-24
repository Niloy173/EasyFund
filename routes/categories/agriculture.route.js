/* external imports */
const express = require("express");
/* internal imports */
const {
  decorateHtmlResponse,
} = require("../../middlewares/common/decorateHtmlResponse");

const { DecodeInformation } = require("../../middlewares/common/LoginCheck");

const { GetProfileAvatar } = require("../../helpers/profileAvatar");

const {
  GetMeAgricultueProjects,
} = require("../../controllers/categories/agriculture");

// app object
const router = express.Router();

router.get(
  "/agricultural-projects",
  decorateHtmlResponse("Agriculture projects"),
  DecodeInformation,
  GetProfileAvatar,
  GetMeAgricultueProjects
);

module.exports = {
  router,
};
