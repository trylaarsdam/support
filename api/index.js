const express = require("express");
const app = express(); // create express app
const path = require("path");
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(express.static(path.join(__dirname, "..", "dist")));
app.use("/api/v1", require("./routes/v1"))
app.use("/api", require("./routes/v1")) // routes to latest API version

app.listen(6001, () => {
  console.log("support system started on port 6001");
});

app.use((req, res, next) => { //send all other requests to react app
  res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
});