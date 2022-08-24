/* external packages */
const express = require("express");

/* internal packages */
const {
  decorateHtmlResponse,
} = require("../../middlewares/common/decorateHtmlResponse");

const { DecodeInformation } = require("../../middlewares/common/LoginCheck");
const { GetProfileAvatar } = require("../../helpers/profileAvatar");
const { GetTheMainStory } = require("../../controllers/mainStory/mainStory");
const { GetSupportPage } = require("../../controllers/mainStory/support");
const {
  RenderThePaymentGateWay,
  SuccessFulPaymentTrans,
  NotificationAfterTrans,
  FailedPaymentTrans,
  CancelPaymentTrans,
} = require("../../controllers/mainStory/payment");

const { PostSingleComment } = require("../../controllers/mainStory/comment");

/* app object */
const router = express.Router();

router.get(
  "/:id",
  decorateHtmlResponse("Story page"),
  DecodeInformation,
  GetProfileAvatar,
  GetTheMainStory
);

router.get(
  "/:id/payment-information",
  decorateHtmlResponse("Payment page"),
  DecodeInformation,
  GetSupportPage
);

router.post(
  "/:id/payment-information",
  DecodeInformation,
  RenderThePaymentGateWay
);
router.post(
  "/:id/payment-information/ssl-payment-notification",
  DecodeInformation,
  NotificationAfterTrans
);
router.post(
  "/:id/payment-information/ssl-payment-success",
  DecodeInformation,
  SuccessFulPaymentTrans
);

router.post(
  "/:id/payment-information/ssl-payment-fail",
  DecodeInformation,
  FailedPaymentTrans
);
router.post(
  "/:id/payment-information/ssl-payment-cancel",
  DecodeInformation,
  CancelPaymentTrans
);

router.post("/:id/comment", DecodeInformation, PostSingleComment);
module.exports = {
  router,
};
