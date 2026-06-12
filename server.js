const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// =========================
// ROOT TEST ROUTE
// =========================

app.get("/", (req, res) => {
  res.send("🎮 Marble Race Server Running!");
});

// =========================
// CODE STORAGE
// =========================

let codes = {};

// =========================
// VALIDATE CODE
// =========================

app.post("/validate", (req, res) => {
  const { code } = req.body;

  if (!codes[code]) {
    return res.json({ valid: false, message: "Invalid code" });
  }

  if (codes[code].used) {
    return res.json({ valid: false, message: "Code already used" });
  }

  res.json({ valid: true });
});

// =========================
// USE CODE
// =========================

app.post("/use", (req, res) => {
  const { code } = req.body;

  if (!codes[code]) {
    return res.json({ success: false });
  }

  codes[code].used = true;

  res.json({ success: true });
});

// =========================
// OPTIONAL: TEMP CODE CREATOR (FOR TESTING)
// =========================

app.post("/add-code", (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.json({ success: false, message: "No code provided" });
  }

  codes[code] = { used: false };

  res.json({ success: true });
});

// =========================
// START SERVER
// =========================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Marble Race Server Running on port " + PORT);
});
