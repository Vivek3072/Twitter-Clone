const express = require("express");
const cors = require("cors");
const cloudinary = require("./config/cloudinary");
const { Server } = require("socket.io");

const connectDb = require("./config/ConnectDB");
connectDb();

const port = process.env.PORT || 5000;

const healthRouter = require("./api/routes/health.routes");
const authRouter = require("./api/routes/main.routes");
const tweetRouter = require("./api/routes/tweet.routes");
const chatRouter = require("./api/routes/chat.routes");
const messageRoutes = require("./api/routes/message.routes");

const app = express();
const corsOptions = {
  origin: [
    process.env.UI_ROOT_URI,
    "http://localhost:3000",
    "http://localhost:5173",
    "https://twitter-clone-zwb6.onrender.com/",
  ],
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/api/health", healthRouter);
app.use("/api/auth", authRouter);
app.use("/api/tweets", tweetRouter);
app.use("/api/chat", chatRouter);
app.use("/api/message", messageRoutes);

const server = app.listen(port, () => {
  console.log(
    "➜ ".green,
    `Server is running on`.bold,
    `http://localhost:${port}`.cyan
  );
});

const io = new Server(server, {
  pingTimeout: 60000,
  cors: corsOptions,
});

io.on("connection", (socket) => {
  console.log("➜ ".green, "Connected to socket.io");
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  socket.on("setup", (userData) => {
    console.log(userData._id, "USERDATA on server");
    socket.join(userData._id);
    socket.emit("CONNECTED");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User joined the room ", room);
  });

  socket.on("new message", (newMessageRecieved) => {
    console.log(newMessageRecieved?.chat?._id, "newmessage server");
    var chat = newMessageRecieved?.chat;

    if (!chat?.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user?._id === newMessageRecieved?.sender?._id)
        return; // We do nothing if the message is sent by the current logged in user, we do not return that message back to him
      else socket.in(user._id).emit("message received", newMessageRecieved); // Sending message in to the users whom loggedIn User have sent the message
    });
  });
});
