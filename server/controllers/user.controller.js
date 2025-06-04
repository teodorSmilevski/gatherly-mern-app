import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/user.model.js";

export const getUserByUsername = async (req, res) => {
  try {
    const username = req.params.username;

    const user = await UserModel.findOne({ username })
      .select("-password -__v -createdAt -updatedAt")
      .populate({
        path: "createdEvents",
        select: "title date location image rsvps categoryId",
        populate: [
          { path: "rsvps", select: "_id" },
          { path: "categoryId", select: "name" },
        ],
      })
      .populate({
        path: "attendedEvents",
        select: "title date location image categoryId",
        populate: {
          path: "categoryId",
          select: "name",
        },
      })
      .lean();

    if (!user) {
      return res.status(404).json({ message: "User doesn't exist!" });
    }

    if (user.createdEvents && Array.isArray(user.createdEvents)) {
      user.createdEvents = user.createdEvents.map((event) => ({
        ...event,
        reservationCount: event.rsvps ? event.rsvps.length : 0,
        category: event.categoryId?.name || "Uncategorized",
        categoryId: undefined,
      }));
    }

    if (user.attendedEvents && Array.isArray(user.attendedEvents)) {
      user.attendedEvents = user.attendedEvents.map((event) => ({
        ...event,
        category: event.categoryId?.name || "Uncategorized",
        categoryId: undefined,
      }));
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user!", error });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find()
      .select("-password -__v -createdAt -updatedAt")
      .populate("createdEvents", "title date location image")
      .populate("attendedEvents", "title date location image")
      .lean();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users!", error });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const existingEmail = await UserModel.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already in use!" });
    }

    const existingUsername = await UserModel.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already in use!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    const token = jwt.sign(
      { userId: newUser._id, role: newUser.role, username: newUser.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const { password: _, ...userWithoutPassword } = newUser.toObject();
    res.status(201).json({ token, user: userWithoutPassword });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password!" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in!", error });
  }
};
