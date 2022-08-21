const { NotificationModel } = require("../../models/NotificationSchema");

async function GetMeAllNotification(req, res, next) {
  try {
    const notifications = await NotificationModel.find({
      OwnerId: req.params.userId,
    }).sort("-createdAt");

    res.status(200).json({
      Info: {
        notifications,
      },
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      errors: {
        common: {
          msg: "Unknown error occured",
        },
      },
    });
  }
}

module.exports = {
  GetMeAllNotification,
};
