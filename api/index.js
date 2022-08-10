const express = require("express");
const app = express(); // create express app
const path = require("path");
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(express.static(path.join(__dirname, "..", "build")));

app.listen(6001, () => {
  console.log("support system started on port 6001");
});

app.use((req, res, next) => { //send all other requests to react app
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});