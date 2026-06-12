const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// =========================
// IN-MEMORY CODE STORE
// =========================
// format:
// { "123456": { used: false } }

let codes = {};

// =========================
// GENERATE CODE
// =========================
// (used by admin device OR hidden button earlier)

app.post("/generate", (req, res) => {
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  codes[code] = {
    used: false,
    created: Date.now()
  };

  res.json({ code });
});

// =========================
// VALIDATE CODE
// =========================
// player enters code to join game

app.post("/validate", (req, res) => {
  const { code } = req.body;

  if (!codes[code]) {
    return res.json({ valid: false, message: "Invalid code" });
  }

  if (codes[code].used) {
    return res.json({ valid: false, message: "Code already used" });
  }

  return res.json({ valid: true });
});

// =========================
// CONSUME CODE (ONE-TIME USE)
// =========================
// called when someone wins or starts (your choice)

app.post("/use", (req, res) => {
  const { code } = req.body;

  if (!codes[code]) {
    return res.json({ success: false });
  }

  codes[code].used = true;

  res.json({ success: true });
});

// =========================
// DEBUG (OPTIONAL)
// =========================
// see all codes (REMOVE IN FINAL PRODUCTION)

app.get("/codes", (req, res) => {
  res.json(codes);
});

// =========================
// START SERVER
// =========================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Marble Race server running on port " + PORT);
});
