/* external imports */
const express = require("express");

/* internal imports */
const {
  decorateHtmlResponse,
} = require("../../middlewares/common/decorateHtmlResponse");

const { AuthCheck } = require("../../middlewares/common/LoginCheck");
const { RemoveData } = require("../../controllers/userend/removedata");

const {
  GetRenderPreview,
  PostPreviewProject,
} = require("../../controllers/formController/preview");

/* app object */
const router = express.Router();

router.get(
  "/",
  decorateHtmlResponse("preview story"),
  AuthCheck,
  GetRenderPreview
);

router.post(
  "/",
  decorateHtmlResponse("preview story"),
  AuthCheck,
  PostPreviewProject
);

router.get("/back", AuthCheck, RemoveData); // when back pressed
module.exports = {
  router,
};
