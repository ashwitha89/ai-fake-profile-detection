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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
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
      alert("Backend not running!");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>AI Fake Profile Detection</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="number" name="followers" placeholder="Followers" onChange={handleChange} style={styles.input} />
        <input type="number" name="following" placeholder="Following" onChange={handleChange} style={styles.input} />
        <input type="number" name="posts" placeholder="Posts" onChange={handleChange} style={styles.input} />
        <input type="number" name="bio_length" placeholder="Bio Length" onChange={handleChange} style={styles.input} />
        <input type="number" name="profile_pic" placeholder="Profile Pic (0 or 1)" onChange={handleChange} style={styles.input} />

        <button type="submit" style={styles.button}>Detect</button>
      </form>

      {result && (
        <div style={styles.resultBox}>
          <h2>{result.result}</h2>
          <p>Confidence: {result.confidence}</p>

          <ul>
            {result.reasons.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
    fontFamily: "Arial",
    background: "linear-gradient(to right, #74ebd5, #ACB6E5)",
    height: "100vh",
    paddingTop: "30px"
  },
  title: {
    color: "#333"
  },
  form: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    width: "300px",
    margin: "auto",
    boxShadow: "0px 0px 10px gray"
  },
  input: {
    width: "90%",
    padding: "10px",
    margin: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc"
  },
  button: {
    padding: "10px 20px",
    background: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },
  resultBox: {
    marginTop: "20px",
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    width: "300px",
    marginLeft: "auto",
    marginRight: "auto"
  }
};

export default ProfileForm;