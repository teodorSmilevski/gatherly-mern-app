import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/user.routes.js";
import eventRoutes from "./routes/event.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import rsvpRoutes from "./routes/rsvp.routes.js";
import commentRoutes from "./routes/comment.routes.js";

import { setupSwagger } from "./docs/swagger.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/rsvps", rsvpRoutes);
app.use("/api/comments", commentRoutes);

setupSwagger(app);

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
