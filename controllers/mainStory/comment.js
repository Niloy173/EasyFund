const { CommentModel } = require("../../models/CommentSchema");
const { Project } = require("../../models/ProjectSchema");
const { User } = require("../../models/UserSchema");
const { NotificationModel } = require("../../models/NotificationSchema");

async function PostSingleComment(req, res, next) {
  try {
    const projectId = req.originalUrl.split("/").reverse()[1];
    const msg = req.body.message;

    const ProjectInfo = await Project.findOne({ _id: projectId }).select(
      "OwnerId"
    );

    const UserInfo = await User.findOne(
      { _id: req.user.userId },
      { fullname: 1, profileImage: 1 }
    );

    const comment = {};
    let role = "";

    // find out the user who's commenting
    // owner or regular user
    if (
      JSON.stringify(req.user.userId) === JSON.stringify(ProjectInfo.OwnerId)
    ) {
      role = "creator";
    } else {
      role = "user";

      // send a notification to the project owner
      const newNotification = new NotificationModel({
        OwnerId: ProjectInfo.OwnerId,
        Message: `Someone has commented on your 
              <a style="color : #0000EE; font-weight: bold; text-decoration : none;" href="/project/${projectId}">project</a>
      `,
      });

      newNotification.save();
    }

    comment.id = UserInfo._id;
    comment.username = UserInfo.fullname;
    comment.profileImage = UserInfo.profileImage;
    comment.message = msg;

    const NewComment = new CommentModel({
      projectId,
      comment,
      role,
    });

    NewComment.save();

    res.status(200).json({
      comment: NewComment,
    });
  } catch (error) {
    res.status(500).json({
      errors: {
        common: error.message,
      },
    });
  }
}

module.exports = {
  PostSingleComment,
};
