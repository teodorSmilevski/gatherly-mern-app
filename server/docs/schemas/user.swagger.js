/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the user
 *         username:
 *           type: string
 *           description: Unique username
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *         password:
 *           type: string
 *           description: User's hashed password
 *         role:
 *           type: string
 *           enum: [user, creator, admin]
 *           description: Role of the user
 *           default: user
 *         createdEvents:
 *           type: array
 *           items:
 *             type: string
 *             description: Event ID created by the user
 *         attendedEvents:
 *           type: array
 *           items:
 *             type: string
 *             description: Event ID attended by the user
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of creation
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of last update
 *       required:
 *         - _id
 *         - username
 *         - email
 *         - password
 *         - role
 */

export const User = {
  type: "object",
  properties: {
    _id: {
      type: "string",
      format: "uuid",
      description: "Unique identifier for the user",
    },
    username: {
      type: "string",
      description: "Unique username",
    },
    email: {
      type: "string",
      format: "email",
      description: "User's email address",
    },
    password: {
      type: "string",
      description: "User's hashed password",
    },
    role: {
      type: "string",
      enum: ["user", "creator", "admin"],
      description: "Role of the user",
      default: "user",
    },
    createdEvents: {
      type: "array",
      items: {
        type: "string",
        description: "Event ID created by the user",
      },
    },
    attendedEvents: {
      type: "array",
      items: {
        type: "string",
        description: "Event ID attended by the user",
      },
    },
    createdAt: {
      type: "string",
      format: "date-time",
      description: "Timestamp of creation",
    },
    updatedAt: {
      type: "string",
      format: "date-time",
      description: "Timestamp of last update",
    },
  },
  required: ["_id", "username", "email", "password", "role"],
};
