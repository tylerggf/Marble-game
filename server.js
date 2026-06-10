const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

// IMPORTANT: serve your frontend
app.use(express.static("public"));

app.listen(PORT, () => {
    console.log("Server running");
});
