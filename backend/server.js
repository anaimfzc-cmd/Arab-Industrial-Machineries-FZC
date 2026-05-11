import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import connectDB from "./config/db.js";

//  MODELS
import Chat from "./models/Chat.js";
import Message from "./models/Message.js";

//  ROUTES
import contactRoutes from "./routes/contact.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import adminAuthRoutes from "./routes/adminAuth.routes.js";
import serviceRoutes from "./routes/service.routes.js";
import orderRoutes from "./routes/order.routes.js";
import userRoutes from "./routes/user.routes.js";
import chatRoutes from "./routes/chat.routes.js";

const app = express();
const server = http.createServer(app);

//  SOCKET.IO
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// ================= SOCKET LOGIC =================
// ================= SOCKET LOGIC =================
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  //  JOIN ROOM
  socket.on("join", (userId) => {
    socket.join(userId);
  });

  //  SEND MESSAGE (FIXED 🔥)
  socket.on("sendMessage", async (data) => {
    try {
      const { userId, text, sender, name, email } = data;

      let chat = await Chat.findOne({ user_id: userId });

      //  CREATE CHAT WITH NAME
      if (!chat) {
        chat = await Chat.create({
          user_id: userId,
          name,
          email,
        });
      }

      //  UPDATE NAME IF MISSING
      if (!chat.name && name) {
        chat.name = name;
        chat.email = email;
        await chat.save();
      }

      //  SAVE MESSAGE
      const message = await Message.create({
        chat_id: chat._id,
        sender,
        text,
      });

      //  EMIT MESSAGE
      io.to(userId).emit("receiveMessage", {
        text: message.text,
        sender: message.sender,
        createdAt: message.createdAt,
        userId,
      });

    } catch (err) {
      console.error("Socket sendMessage error:", err);
    }
  });

  //  TYPING
  socket.on("typing", ({ userId, sender }) => {
    socket.to(userId).emit("typing", sender);
  });

  //  SEEN
  socket.on("seen", async ({ userId }) => {
    try {
      const chat = await Chat.findOne({ user_id: userId });

      if (chat) {
        await Message.updateMany(
          { chat_id: chat._id, sender: "user" },
          { seen: true }
        );
      }

      io.to(userId).emit("seen");

    } catch (err) {
      console.error("Seen error:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
// =================================================

//  CONNECT DB
connectDB();

//  MIDDLEWARES
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());

//  HEALTH CHECK
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

//  ROUTES
app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminAuthRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

//  ERROR HANDLER
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

//  START SERVER
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(` Backend running on port ${PORT}`);
});