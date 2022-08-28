const express = require("express");

const { DecodeInformation } = require("../middlewares/common/LoginCheck");
const {
  decorateHtmlResponse,
} = require("../middlewares/common/decorateHtmlResponse");

const { GetProfileAvatar } = require("../helpers/profileAvatar");

const router = express.Router();

router.get(
  "/ourStory",
  decorateHtmlResponse("About us"),
  DecodeInformation,
  GetProfileAvatar,
  (req, res, next) => {
    res.render("footerContent/OurStory");
  }
);

router.get(
  "/privacy&policy",
  decorateHtmlResponse("privacy & policy"),
  DecodeInformation,
  GetProfileAvatar,
  (req, res, next) => {
    res.render("footerContent/privacy");
  }
);

router.get(
  "/policy/cookie",
  decorateHtmlResponse("Cookies"),
  DecodeInformation,
  GetProfileAvatar,
  (req, res, next) => {
    res.render("footerContent/cookies");
  }
);

module.exports = {
  router,
};
