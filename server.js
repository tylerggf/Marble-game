const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// in-memory storage (you can upgrade to DB later)
let codes = {}; 
// format: { "123456": { used:false } }

app.post("/generate", (req, res) => {
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  codes[code] = { used: false };

  res.json({ code });
});

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

app.post("/use", (req, res) => {
  const { code } = req.body;

  if (!codes[code]) {
    return res.json({ success: false });
  }

  codes[code].used = true;

  res.json({ success: true });
});

app.get("/codes", (req, res) => {
  res.json(codes);
});

app.listen(3000, () => console.log("Server running"));
