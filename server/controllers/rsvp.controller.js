import { RSVPModel } from "../models/rsvp.model.js";
import { EventModel } from "../models/event.model.js";
import { UserModel } from "../models/user.model.js";

export const createRSVP = async (req, res) => {
  try {
    const { eventId } = req.body;
    const userId = req.user.userId;

    const existingRSVP = await RSVPModel.findOne({ eventId, userId });
    if (existingRSVP) {
      return res.status(400).json({
        message: "Reservation already exists for this user and event!",
      });
    }

    const newRSVP = await RSVPModel.create({
      eventId,
      userId,
    });

    await EventModel.findByIdAndUpdate(eventId, {
      $addToSet: { rsvps: newRSVP._id },
    });

    await UserModel.findByIdAndUpdate(userId, {
      $addToSet: { attendedEvents: eventId },
    });

    res.status(201).json({ rsvp: newRSVP });
  } catch (error) {
    res.status(500).json({ message: "Error creating RSVP!", error });
  }
};

export const getRSVPsByEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    const rsvps = await RSVPModel.find({ eventId })
      .populate("userId", "username")
      .populate("eventId", "title date location")
      .lean();

    res.status(200).json({ rsvps });
  } catch (error) {
    res.status(500).json({ message: "Error fetching RSVPs for event!", error });
  }
};

export const getRSVPSsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const rsvps = await RSVPModel.find({ userId })
      .populate("eventId", "image title date location")
      .lean();

    res.status(200).json({ rsvps });
  } catch (error) {
    res.status(500).json({ message: "Error fetching RSVPs for user!", error });
  }
};

export const deleteRSVP = async (req, res) => {
  try {
    const { rsvpId } = req.params;

    const rsvp = await RSVPModel.findByIdAndDelete(rsvpId);

    if (!rsvp) {
      return res.status(404).json({ message: "RSVP not found!" });
    }

    await EventModel.findByIdAndUpdate(rsvp.eventId, {
      $pull: { rsvps: rsvpId },
    });

    await UserModel.findByIdAndUpdate(rsvp.userId, {
      $pull: { attendedEvents: rsvp.eventId },
    });

    res.status(200).json({ message: "RSVP deleted successfully!", rsvp });
  } catch (error) {
    res.status(500).json({ message: "Error deleting RSVP!", error });
  }
};
