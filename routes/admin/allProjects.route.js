const express = require("express");

const {
  decorateHtmlResponse,
} = require("../../middlewares/common/decorateHtmlResponse");

const { AuthCheck } = require("../../middlewares/common/LoginCheck");

const {
  DiscoverAllProject,
} = require("../../controllers/common/discoverProject");

const router = express.Router();

router.get(
  "/all-projects",
  decorateHtmlResponse("All Projects"),
  AuthCheck,
  DiscoverAllProject
);

module.exports = {
  router,
};
