const express = require("express");

const {
  decorateHtmlResponse,
} = require("../../middlewares/common/decorateHtmlResponse");

const { AuthCheck } = require("../../middlewares/common/LoginCheck");

const {
  RenderAllProject,
  ShowSingleProject,
} = require("../../controllers/admin/discover_allproject");

const router = express.Router();

router.get(
  "/all-projects",
  decorateHtmlResponse("All Projects"),
  AuthCheck,
  RenderAllProject
);

router.get(
  "/all-projects/:id",
  decorateHtmlResponse("main story"),
  AuthCheck,
  ShowSingleProject
);

module.exports = {
  router,
};
