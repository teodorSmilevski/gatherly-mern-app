import { UserModel } from "../models/user.model.js";
import { EventModel } from "../models/event.model.js";
import { CommentModel } from "../models/comment.model.js";
import { RSVPModel } from "../models/rsvp.model.js";
import { formatDate } from "../utils/formatDate.js";
import { CategoryModel } from "../models/category.model.js";

export const createEvent = async (req, res) => {
  try {
    const userId = req.user.userId;
    const userRole = req.user.role;

    console.log(userRole);

    if (userRole !== "creator") {
      return res
        .status(403)
        .json({ message: "Unauthorized: user is not a creator." });
    }

    const { title, description, date, location, categoryId, maxCapacity } =
      req.body;

    const category = await CategoryModel.findById(categoryId);

    const newEvent = await EventModel.create({
      title,
      description,
      date,
      location,
      categoryId,
      creatorId: userId,
      image: `/images/category/${category?.name}.jpg`,
      maxCapacity,
    });

    await UserModel.findByIdAndUpdate(userId, {
      $addToSet: { createdEvents: newEvent._id },
    });

    res.status(201).json({ event: newEvent });
  } catch (error) {
    res.status(500).json({ message: "Error creating event!", error });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const events = await EventModel.find()
      .select("title image date categoryId location")
      .populate("categoryId", "name")
      .sort({ createdAt: -1 })
      .lean();

    const formattedEvents = events.map((event) => ({
      ...event,
      date: formatDate(event.date),
      category: event.categoryId ? event.categoryId.name : "Uncategorized",
      categoryId: undefined,
    }));

    res.status(200).json({ formattedEvents });
  } catch (error) {
    res.status(500).json({ message: "Error fetching events!", error });
  }
};

export const getEventById = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await EventModel.findById(eventId)
      .populate("creatorId", "username")
      .populate("categoryId", "name")
      .populate({
        path: "comments",
        select: "text createdAt",
        populate: { path: "userId", select: "username" },
      })
      .populate({
        path: "rsvps",
        select: "status joinedAt",
        populate: { path: "userId", select: "username" },
      });

    res.status(200).json({
      event: {
        ...event.toObject(),
        creator: event.creatorId,
        date: formatDate(event.date),
        createdAt: formatDate(event.createdAt),
        category: event.categoryId ? event.categoryId.name : "Uncategorized",
        categoryId: undefined,
        updatedAt: undefined,
        creatorId: undefined,
        __v: undefined,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching event!", error });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    const event = await EventModel.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found!" });
    }

    await CommentModel.deleteMany({ eventId: eventId });

    await RSVPModel.deleteMany({ eventId: eventId });

    await EventModel.findByIdAndDelete(eventId);

    await UserModel.updateMany(
      { createdEvents: eventId },
      { $pull: { createdEvents: eventId } }
    );

    res.status(200).json({ message: "Event deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting event!", error });
  }
};
