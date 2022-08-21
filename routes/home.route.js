/* package goes here */
const express = require("express");
const {
  decorateHtmlResponse,
} = require("../middlewares/common/decorateHtmlResponse");

const { DecodeInformation } = require("../middlewares/common/LoginCheck");
const { logout } = require("../controllers/userend/logout");

const { GetProfileAvatar } = require("../helpers/profileAvatar");
const { GetMeAllProjectCard } = require("../controllers/common/allprojectCard");
const {
  GetMeAllNotification,
} = require("../controllers/userend/GetNotification");
/*----------*/

const router = express.Router();

router.get(
  "/",
  decorateHtmlResponse("home"),
  DecodeInformation,
  GetProfileAvatar,
  GetMeAllProjectCard
);

router.delete("/", logout);

router.get("/notification/:userId", GetMeAllNotification);

module.exports = {
  router,
};
