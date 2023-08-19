const express = require("express");
const connectDb = require("./config/ConnectDB");
connectDb();

const authRouter = require("./api/routes/main.routes");
const tweetRouter = require("./api/routes/tweet.routes");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/tweets", tweetRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
