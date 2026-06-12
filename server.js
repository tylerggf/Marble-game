const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

const FILE = "codes.json";

// load saved data
let codes = {};
if (fs.existsSync(FILE)) {
  codes = JSON.parse(fs.readFileSync(FILE));
}

// save helper
function save() {
  fs.writeFileSync(FILE, JSON.stringify(codes));
}

// GENERATE CODE
app.post("/generate", (req,res)=>{
  const code = Math.floor(100000 + Math.random()*900000).toString();

  codes[code] = { used:false };

  save();

  res.json({ code });
});

// VALIDATE CODE
app.post("/validate",(req,res)=>{
  const { code } = req.body;

  if(!codes[code]) {
    return res.json({ valid:false, message:"Invalid code" });
  }

  if(codes[code].used) {
    return res.json({ valid:false, message:"Code already used" });
  }

  res.json({ valid:true });
});

// USE CODE
app.post("/use",(req,res)=>{
  const { code } = req.body;

  if(codes[code]) {
    codes[code].used = true;
    save();
  }

  res.json({ success:true });
});

app.listen(3000, ()=>console.log("Server running"));
