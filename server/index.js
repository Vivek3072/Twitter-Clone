const express = require("express");
const connectDb = require("./config/connectDB");
connectDb();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
