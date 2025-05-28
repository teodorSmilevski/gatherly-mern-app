const USER_MODEL = {
  _id: "u123",
  username: "john_doe",
  email: "john_doe@email.com",
  password: "hashed_password",
  role: "user",
  createdAt: "2023-01-01T12:00:00Z",
};

const EVENT_MODEL = {
  _id: "e456",
  title: "React Skopje Meetup",
  description: "Let's talk React, share ideas, and network.",
  date: "2025-06-10T18:00Z",
  location: "Public Room, Skopje",
  image: "https://cloudstorage.com/event1.jpg",
  creatorId: "u123",
  category: "Tech",
  comments: [
    {
      userId: "u002",
      text: "See you there!",
      createdAt: "2025-06-01T09:00Z",
    },
  ],
  rsvps: ["u345", "u678"],
  createdAt: "2025-05-26T12:00Z",
};

const COMMENT_MODEL = {
  _id: "c101",
  eventId: "e456",
  userId: "u345",
  text: "Looking forward to this!",
  createdAt: "2025-05-27T10:15Z",
};

const CATEGORY_MODEL = {
  _id: "cat01",
  name: "Technology",
};

const RSVP_MODEL = {
  _id: "r789",
  eventId: "e456",
  userId: "u345",
  status: "joined",
  joinedAt: "2025-05-27T14:30Z",
};
