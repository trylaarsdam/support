//express router
const express = require("express");
const router = express.Router();

module.exports = router

router.use("/accounts", require("./accounts"))
router.use("/tickets", require("./tickets"))

router.get("/", (req, res) => {
  res.send("V1 API")
})