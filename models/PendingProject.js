const mongoose = require("mongoose");

const PendingProjectSchema = mongoose.Schema(
  {
    OwnerId: {
      type: mongoose.Types.ObjectId,
    },

    TargetAmount: {
      type: String,
      required: true,
    },

    CurrentAmount: {
      type: Number,
      required: true,
    },

    Validity: {
      type: String,
      required: true,
    },

    StoryTitle: {
      type: String,
      required: true,
    },

    MainStory: {
      type: String,
      required: true,
    },

    Category: {
      type: String,
      required: true,
    },

    CoverPicture: {
      data: Buffer,
      contentType: String,
    },

    Attachments: [
      {
        data: Buffer,
        contentType: String,
      },
    ],

    CreationDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

PendingProjectSchema.methods = {
  InsertProject: function (obj) {
    const newProject = mongoose.model("PendingProject");
    return newProject(obj);
  },

  ShowAllProject: function (cb) {
    return mongoose.model("PendingProject").find({}, cb);
  },
};

const PendingProject = new mongoose.model(
  "PendingProject",
  PendingProjectSchema
);

module.exports = {
  PendingProject,
};
