const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json("Soltickets all good here");
});

module.exports = router;
