const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

// THIS serves your website
app.use(express.static("public"));

app.listen(PORT, () => {
    console.log("Server running");
});
