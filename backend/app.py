from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import os

app = Flask(__name__)
CORS(app)

# ✅ Load model safely
model_path = "model.pkl"

if not os.path.exists(model_path):
    raise FileNotFoundError("❌ model.pkl not found. Please train model first.")

model = pickle.load(open(model_path, "rb"))

@app.route('/')
def home():
    return "AI Model Running!"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

        # ✅ Safe input handling
        followers = int(data.get('followers', 0))
        following = int(data.get('following', 0))
        posts = int(data.get('posts', 0))
        bio_length = int(data.get('bio_length', 0))
        profile_pic = int(data.get('profile_pic', 0))

        # ✅ Feature array
        features = np.array([[followers, following, posts, bio_length, profile_pic]])

        # Prediction
        prediction = model.predict(features)[0]
        probability = model.predict_proba(features)[0]

        # Result
        if prediction == 1:
            result = "Fake Profile 🚫"
            confidence = probability[1] * 100
        else:
            result = "Real Profile ✅"
            confidence = probability[0] * 100

        # ✅ Improved reasoning (not strict rules)
        reasons = []

        ratio = followers / following if following > 0 else followers

        if ratio < 0.1:
            reasons.append("Very low follower/following ratio")

        if followers < 20 and following > 200:
            reasons.append("High following but very low followers")

        if posts == 0:
            reasons.append("No posts (could be inactive user)")

        if bio_length < 3:
            reasons.append("Very short bio")

        if profile_pic == 0:
            reasons.append("No profile picture")

        # ✅ Remove unnecessary harsh judgments
        if prediction == 0:
            reasons = []  # Clear reasons for real profiles

        return jsonify({
            "result": result,
            "confidence": f"{confidence:.2f}%",
            "reasons": reasons
        })

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True)