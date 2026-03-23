import React, { useState } from "react";

function ProfileForm() {
  const [followers, setFollowers] = useState("");
  const [following, setFollowing] = useState("");
  const [posts, setPosts] = useState("");
  const [bioLength, setBioLength] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("https://ai-fake-profile-detection-glsl.onrender.com/detect", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        followers: Number(followers),
        following: Number(following),
        posts: Number(posts),
        bio_length: Number(bioLength),
        profile_pic: Number(profilePic)
      })
    });

    const data = await response.json();
    console.log(data);   // 🔥 see output in console
    setResult(data.result);

  } catch (error) {
    console.error("Error:", error);
    setResult("Error connecting to backend");
  }
};

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input placeholder="Followers" onChange={(e) => setFollowers(e.target.value)} />
        <input placeholder="Following" onChange={(e) => setFollowing(e.target.value)} />
        <input placeholder="Posts" onChange={(e) => setPosts(e.target.value)} />
        <input placeholder="Bio Length" onChange={(e) => setBioLength(e.target.value)} />
        <input placeholder="Profile Pic (0 or 1)" onChange={(e) => setProfilePic(e.target.value)} />
        
        <button type="submit">Detect</button>
      </form>

      <h3>{result}</h3>
    </div>
  );
}

export default ProfileForm;