/**
 * @swagger
 * components:
 *   schemas:
 *     RSVP:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the RSVP
 *         eventId:
 *           type: string
 *           description: ID of the event that was RSVPed
 *         userId:
 *           type: string
 *           description: ID of the user who RSVPed
 *         status:
 *           type: string
 *           enum: [Going, Interested]
 *           description: RSVP status
 *         joinedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the RSVP was created
 *       required:
 *         - _id
 *         - eventId
 *         - userId
 *         - joinedAt
 *     RSVPCreate:
 *       type: object
 *       properties:
 *         eventId:
 *           type: string
 *           description: ID of the event to RSVP to
 *       required:
 *         - eventId
 */

export const RSVP = {
  type: "object",
  properties: {
    _id: {
      type: "string",
      format: "uuid",
      description: "Unique identifier for the RSVP",
    },
    eventId: { type: "string", description: "ID of the event that was RSVPed" },
    userId: { type: "string", description: "ID of the user who RSVPed" },
    status: {
      type: "string",
      enum: ["Going", "Interested"],
      description: "RSVP status",
    },
    joinedAt: {
      type: "string",
      format: "date-time",
      description: "Timestamp when the RSVP was created",
    },
  },
  required: ["_id", "eventId", "userId", "joinedAt"],
};

export const RSVPCreate = {
  type: "object",
  properties: {
    eventId: { type: "string", description: "ID of the event to RSVP to" },
  },
  required: ["eventId"],
};
