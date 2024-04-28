const express = require("express");
const cors = require("cors");
const { Server } = require("http");
const { Server: SocketServer } = require("socket.io");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const pool = require("./db");
require("dotenv").config();

const app = express();
const httpServer = Server(app);
const io = new SocketServer(httpServer, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

app.use(cors());
app.use(express.json());

pool.connect()
  .then(() => {
    console.log("DB Connection Successful");
  })
  .catch((err) => {
    console.error("Error connecting to PostgreSQL:", err);
  });

app.get("/api/ping", (_req, res) => {
  const onlineUsersCount = global.onlineUsers.size;
  
  // Return the response with the count of online users
  return res.json({ msg: `Ping Successful. Online users: ${onlineUsersCount}`});

  // return res.json({ msg: "Ping Successful" });
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

httpServer.listen(5000, () => {
  console.log(`Server started on port 5000`);
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});
