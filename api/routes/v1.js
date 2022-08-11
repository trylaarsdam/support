//express router
const express = require("express");
const router = express.Router();

module.exports = router

router.get("/", (req, res) => {
  res.send("V1 API")
})