const express = require("express");

const {
  decorateHtmlResponse,
} = require("../../middlewares/common/decorateHtmlResponse");

const {
  AuthCheck,
  RoleBaseAuthorize,
} = require("../../middlewares/common/LoginCheck");

const { RenderPendingProject } = require("../../controllers/admin/dashboard");

const router = express.Router();

router.get(
  "/dashboard",
  decorateHtmlResponse("Dashboard"),
  AuthCheck,
  RoleBaseAuthorize,
  RenderPendingProject
);

router.delete("/dashboard", (req, res, next) => {
  res.clearCookie(process.env.COOKIE_NAME);
  res.send("sign out");
});

module.exports = {
  router,
};
