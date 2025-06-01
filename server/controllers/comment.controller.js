import { CommentModel } from "../models/comment.model.js";
import { EventModel } from "../models/event.model.js";

export const createComment = async (req, res) => {
  try {
    const { eventId, text } = req.body;

    if (!req.user || !req.user.userId) {
      return res.status(401).json({ message: "Unauthorized: user not found." });
    }
    if (!eventId || !text) {
      return res
        .status(400)
        .json({ message: "eventId and text are required." });
    }
    const userId = req.user.userId;

    if (!userId || !eventId || !text) {
      return res.status(400).json({ message: "Missing data." });
    }

    const newComment = await CommentModel.create({
      eventId,
      userId,
      text,
    });

    await EventModel.findByIdAndUpdate(eventId, {
      $addToSet: { comments: newComment._id },
    });

    res.status(201).json({ comment: newComment });
  } catch (error) {
    res.status(500).json({ message: "Error creating comment!", error });
  }
};

export const getCommentsByEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    const comments = await CommentModel.find({ eventId })
      .populate("userId", "username")
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({ comments });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching comments for event!", error });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const deletedComment = await CommentModel.findByIdAndDelete(commentId);

    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found!" });
    }

    await EventModel.findByIdAndUpdate(deletedComment.eventId, {
      $pull: { comments: deletedComment._id },
    });

    res.status(200).json({
      message: "Comment deleted successfully!",
      comment: deletedComment,
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting comment!", error });
  }
};
