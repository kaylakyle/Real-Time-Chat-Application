// import express from "express";
// import authRoutes from "./routes/auth.route.js";
// import messageRoutes from "./routes/message.route.js";
// import dotenv from "dotenv";
// import connectDB from "./lib/db.js";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import http from "http";
// import { Server } from "socket.io";

// dotenv.config();

// const app = express();

// // MIDDLEWARE
// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true,
// }));

// app.use(express.json());
// app.use(cookieParser());

// // ROUTES
// app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoutes);


// // DB
// connectDB();


// // SOCKET SETUP 
// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173",
//     credentials: true,
//   },
// });

// // store online users
// const userSocketMap = {};

// io.on("connection", (socket) => {
//   console.log("User connected:", socket.id);

//   const userId = socket.handshake.query.userId;

//   if (userId) {
//     userSocketMap[userId] = socket.id;
//   }

//   // send online users to all clients
//   io.emit("getOnlineUsers", Object.keys(userSocketMap));

//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.id);

//     if (userId) {
//       delete userSocketMap[userId];
//     }

//     io.emit("getOnlineUsers", Object.keys(userSocketMap));
//   });
// });

// // START SERVER
// const PORT = process.env.PORT || 5000;

// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });



import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import path from "path";
import { Server } from "socket.io";

import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

/* ========================
   MIDDLEWARE
======================== */

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

/* ========================
   SOCKET.IO SETUP
======================== */

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  },
});

// store online users
const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  const userId = socket.handshake.query.userId;

  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  // send online users to all clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // ✅ REAL-TIME MESSAGE HANDLER
  socket.on("sendMessage", ({ receiverId, message }) => {
    const receiverSocketId = userSocketMap[receiverId];

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receiveMessage", message);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);

    if (userId) {
      delete userSocketMap[userId];
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

/* ========================
   ROUTES
======================== */

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

/* ========================
   PRODUCTION FRONTEND
======================== */

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.join(__dirname, "../frontend/dist/index.html")
    );
  });
}

/* ========================
   DB + SERVER START
======================== */

server.listen(PORT, () => {
  console.log("Server running on PORT:", PORT);
  connectDB();
});
