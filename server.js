const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ROOT ROUTE
app.get("/", (req, res) => {
  res.send("Marble Race Server Running!");
});

// STORAGE
let codes = {};

// VALIDATE
app.post("/validate", (req, res) => {
  const code = req.body.code;

  if (!code || !codes[code]) {
    return res.json({ valid: false, message: "Invalid code" });
  }

  if (codes[code].used) {
    return res.json({ valid: false, message: "Code already used" });
  }

  return res.json({ valid: true });
});

// USE CODE
app.post("/use", (req, res) => {
  const code = req.body.code;

  if (!code || !codes[code]) {
    return res.json({ success: false });
  }

  codes[code].used = true;

  return res.json({ success: true });
});

// TEMP CODE ADD (FOR TESTING ONLY)
app.post("/add-code", (req, res) => {
  const code = req.body.code;

  if (!code) {
    return res.json({ success: false });
  }

  codes[code] = { used: false };

  return res.json({ success: true });
});

// START SERVER
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
