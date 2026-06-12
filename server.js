const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ SERVE FILES FROM ROOT FOLDER (IMPORTANT FIX)
app.use(express.static(__dirname));

// ✅ ROOT OPENS YOUR GAME FILE
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "Game.html"));
});

// =========================
// API SYSTEM (UNCHANGED)
// =========================

let codes = {};

app.post("/add-code", (req, res) => {
  const { code } = req.body;

  if (!code) return res.json({ success: false });

  codes[code] = { used: false };

  res.json({ success: true });
});

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

app.post("/use", (req, res) => {
  const { code } = req.body;

  if (!codes[code]) return res.json({ success: false });

  codes[code].used = true;

  res.json({ success: true });
});

// =========================
// START SERVER
// =========================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
