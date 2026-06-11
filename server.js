const express = require("express");
const path = require("path");

const app = express();

// serve static files (optional but good)
app.use(express.static(__dirname));

// THIS fixes your error
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "Game.html"));
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running");
});
