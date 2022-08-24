const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema(
  {
    projectId: {
      type: mongoose.Types.ObjectId,
    },

    comment: {
      id: mongoose.Types.ObjectId,
      username: String,
      profileImage: {
        data: Buffer,
        contentType: String,
      },
      message: String,
    },

    role: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const CommentModel = new mongoose.model("Comment", CommentSchema);

module.exports = {
  CommentModel,
};
