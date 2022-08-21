const mongoose = require("mongoose");

const NotificationSchema = mongoose.Schema(
  {
    OwnerId: {
      type: mongoose.Types.ObjectId,
    },
    Message: {
      type: String,
    },

    date_time: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const NotificationModel = new mongoose.model(
  "Notification",
  NotificationSchema
);

module.exports = {
  NotificationModel,
};
