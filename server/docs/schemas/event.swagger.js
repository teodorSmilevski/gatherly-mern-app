/**
 * @swagger
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the event
 *         title:
 *           type: string
 *           description: Title of the event
 *         description:
 *           type: string
 *           description: Detailed description
 *         date:
 *           type: string
 *           format: date-time
 *           description: Date and time of the event
 *         location:
 *           type: string
 *           description: Event location
 *         image:
 *           type: string
 *           description: Image URL
 *         creatorId:
 *           type: string
 *           description: User ID of the event creator
 *         categoryId:
 *           type: string
 *           description: Category ID the event belongs to
 *         maxCapacity:
 *           type: integer
 *           description: Maximum number of attendees
 *         comments:
 *           type: array
 *           items:
 *             type: string
 *             description: Comment IDs
 *         rsvps:
 *           type: array
 *           items:
 *             type: string
 *             description: RSVP IDs
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       required:
 *         - _id
 *         - title
 *         - description
 *         - date
 *         - location
 *         - creatorId
 *         - categoryId
 *     EventCreate:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         date:
 *           type: string
 *           format: date-time
 *         location:
 *           type: string
 *         image:
 *           type: string
 *         categoryId:
 *           type: string
 *         maxCapacity:
 *           type: integer
 *       required:
 *         - title
 *         - description
 *         - date
 *         - location
 *         - categoryId
 */

export const Event = {
  type: "object",
  properties: {
    _id: {
      type: "string",
      format: "uuid",
      description: "Unique identifier for the event",
    },
    title: {
      type: "string",
      description: "Title of the event",
    },
    description: {
      type: "string",
      description: "Detailed description",
    },
    date: {
      type: "string",
      format: "date-time",
      description: "Date and time of the event",
    },
    location: {
      type: "string",
      description: "Event location",
    },
    image: {
      type: "string",
      description: "Image URL",
    },
    creatorId: {
      type: "string",
      description: "User ID of the event creator",
    },
    categoryId: {
      type: "string",
      description: "Category ID the event belongs to",
    },
    maxCapacity: {
      type: "integer",
      description: "Maximum number of attendees",
    },
    comments: {
      type: "array",
      items: {
        type: "string",
        description: "Comment IDs",
      },
    },
    rsvps: {
      type: "array",
      items: {
        type: "string",
        description: "RSVP IDs",
      },
    },
    createdAt: {
      type: "string",
      format: "date-time",
    },
    updatedAt: {
      type: "string",
      format: "date-time",
    },
  },
  required: [
    "_id",
    "title",
    "description",
    "date",
    "location",
    "creatorId",
    "categoryId",
  ],
};

export const EventCreate = {
  type: "object",
  properties: {
    title: {
      type: "string",
    },
    description: {
      type: "string",
    },
    date: {
      type: "string",
      format: "date-time",
    },
    location: {
      type: "string",
    },
    categoryId: {
      type: "string",
    },
    maxCapacity: {
      type: "integer",
    },
  },
  required: ["title", "description", "date", "location", "categoryId"],
};
