const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/detect", (req, res) => {

  const { followers, following, posts, bio_length, profile_pic } = req.body;

  console.log("Request received:", followers, following, posts, bio_length, profile_pic);

  const command = `python ../ai-model/predict.py ${followers} ${following} ${posts} ${bio_length} ${profile_pic}`;

  exec(command, (error, stdout, stderr) => {

    if (error) {
      console.log("Error:", error);
      return res.json({ result: "Error running AI model" });
    }

    console.log("Python Output:", stdout);

    res.json({
      result: stdout.trim()
    });

  });

});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});