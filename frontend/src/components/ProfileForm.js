import React, { useState } from 'react';

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    followers: "",
    following: "",
    posts: "",
    bio_length: "",
    profile_pic: ""
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          followers: Number(formData.followers),
          following: Number(formData.following),
          posts: Number(formData.posts),
          bio_length: Number(formData.bio_length),
          profile_pic: Number(formData.profile_pic)
        })
      });

      const data = await response.json();
      setResult(data);

    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>AI Fake Profile Detection</h2>

      <form onSubmit={handleSubmit}>
        <input type="number" name="followers" placeholder="Followers" onChange={handleChange} />
        <input type="number" name="following" placeholder="Following" onChange={handleChange} />
        <input type="number" name="posts" placeholder="Posts" onChange={handleChange} />
        <input type="number" name="bio_length" placeholder="Bio Length" onChange={handleChange} />
        <input type="number" name="profile_pic" placeholder="Profile Pic (0 or 1)" onChange={handleChange} />

        <button type="submit">Detect</button>
      </form>

      {/* ✅ Show Result */}
      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>Result: {result.result}</h3>
          <p>Confidence: {result.confidence}</p>
        </div>
      )}
    </div>
  );
};

export default ProfileForm;