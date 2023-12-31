const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "Server Healthy!" });
});

module.exports = router;
