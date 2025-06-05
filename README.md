# Gatherly MERN App

This is a full-stack MERN (MongoDB, Express, React, Node.js) project using Vite for the frontend and Express for the backend.

## Structure

- `client/` – React frontend
- `server/` – Express + MongoDB backend

---

## 🚀 Features

-  Authentication & Authorization (JWT)
-  3 User Roles: **User**, **Event Creator**, **Admin**
-  Event creation, listing, and RSVP system
-  Comments on events
-  Profile analytics with Recharts
-  Protected routes and middleware
-  SPA routing with `react-router-dom`
-  Swagger API documentation
-  Docker support

---

## 🛠 Tech Stack

| Layer       | Tech                          
|-------------|-------------------------------|
| Frontend    | React, Vanilla CSS 
| Backend     | Node.js, Express, MongoDB, Mongoose 
| Auth        | JWT (JSON Web Tokens)         
| Docs        | Swagger UI via `swagger-jsdoc` 
| Dev Tools   | Docker, Docker Compose        

---

## 📦 Models Used (MongoDB)

- **User** – with roles and profile
- **Event** – with creator, RSVPs, comments
- **Category** – for event classification
- **RSVP** – records of user registrations
- **Comment** – feedback or messages on events

# 🛠 Installation Guide for Gatherly

Follow these steps to set up the project locally or with Docker.

---

## ⚙️ Local Development

### 1. Clone the Repository

```bash
git clone https://github.com/teodorSmilevski/gatherly-mern-app
cd gatherly-mern-app
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in `/server`:

NOTE: This project uses environment variables for configuration. Copy the example files and fill in your own values:
```
PORT=5000
MONGO_URI=mongodb+srv://your-username:<your-password>@gatherly-mern-app.du8os6v.mongodb.net/?retryWrites=true&w=majority&appName=gatherly-mern-app
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

### 3. Frontend Setup

```bash
cd ../client
npm install
```

Create a `.env` file in `/client`:

```
VITE_API_BASE_URL=http://localhost:5000/api
```

## 🐳 Docker Setup

Make sure Docker is installed, then run:

```bash
docker compose build
```

And run the application with:
```bash
docker compose up
```

Services:

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api

---

## 🧪 API Documentation

Visit: http://localhost:5000/api-docs

This opens the Swagger UI for testing endpoints.

