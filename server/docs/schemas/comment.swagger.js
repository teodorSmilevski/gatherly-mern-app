/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the comment
 *         eventId:
 *           type: string
 *           description: ID of the event this comment belongs to
 *         userId:
 *           type: string
 *           description: ID of the user who made the comment
 *         text:
 *           type: string
 *           description: Comment text content
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when comment was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when comment was last updated
 *       required:
 *         - _id
 *         - eventId
 *         - userId
 *         - text
 *         - createdAt
 *     CommentCreate:
 *       type: object
 *       properties:
 *         eventId:
 *           type: string
 *           description: ID of the event to comment on
 *         text:
 *           type: string
 *           description: Text of the comment
 *       required:
 *         - eventId
 *         - text
 */

export const Comment = {
  type: "object",
  properties: {
    _id: {
      type: "string",
      format: "uuid",
      description: "Unique identifier for the comment",
    },
    eventId: {
      type: "string",
      description: "ID of the event this comment belongs to",
    },
    userId: {
      type: "string",
      description: "ID of the user who made the comment",
    },
    text: { type: "string", description: "Comment text content" },
    createdAt: {
      type: "string",
      format: "date-time",
      description: "Timestamp when comment was created",
    },
    updatedAt: {
      type: "string",
      format: "date-time",
      description: "Timestamp when comment was last updated",
    },
  },
  required: ["_id", "eventId", "userId", "text", "createdAt"],
};

export const CommentCreate = {
  type: "object",
  properties: {
    eventId: { type: "string" },
    text: { type: "string" },
  },
  required: ["eventId", "text"],
};
