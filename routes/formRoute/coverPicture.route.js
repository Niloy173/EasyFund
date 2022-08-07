/* external imports */
const express = require("express");

/* internal imports */
const { AuthCheck } = require("../../middlewares/common/LoginCheck");
const {
  decorateHtmlResponse,
} = require("../../middlewares/common/decorateHtmlResponse");
const {
  GetRenderCover,
  PostRenderCover,
} = require("../../controllers/formController/coverPicture");

const { GetProfileAvatar } = require("../../helpers/profileAvatar");

/* app object */
const router = express.Router();

router.get(
  "/",
  decorateHtmlResponse("Select a picture"),
  AuthCheck,
  GetProfileAvatar,
  GetRenderCover
);

router.post(
  "/",
  decorateHtmlResponse("Select a picture"),
  AuthCheck,
  GetProfileAvatar,
  PostRenderCover
);

module.exports = {
  router,
};
