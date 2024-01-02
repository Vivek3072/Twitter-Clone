const express = require("express");
const cors = require("cors");
const cloudinary = require("./config/cloudinary");

const connectDb = require("./config/ConnectDB");
connectDb();

const port = process.env.PORT || 5000;

const healthRouter = require("./api/routes/health.routes");
const authRouter = require("./api/routes/main.routes");
const tweetRouter = require("./api/routes/tweet.routes");
const chatRouter = require("./api/routes/chat.routes");

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

app.listen(port, () => {
  console.log(
    "➜ ".green,
    `Server is running on`.bold,
    `http://localhost:${port}`.cyan
  );
});
