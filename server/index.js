import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/user.routes.js";
import eventRoutes from "./routes/event.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import rsvpRoutes from "./routes/rsvp.routes.js";
import commentRoutes from "./routes/comment.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/events", eventRoutes);
app.use("/categories", categoryRoutes);
app.use("/rsvps", rsvpRoutes);
app.use("/comments", commentRoutes);

app.get("/", (req, res) => {
  res.send("API is running.");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
