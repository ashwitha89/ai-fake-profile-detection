const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Detect API
app.post("/detect", (req, res) => {
  const { followers, following, posts, bio_length, profile_pic } = req.body;

  console.log("Request received:", followers, following, posts, bio_length, profile_pic);

  res.json({
    result: "Fake Profile (Demo Result)"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});