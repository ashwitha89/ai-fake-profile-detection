from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)   # ✅ Allow React to connect

@app.route('/')
def home():
    return "Backend is running"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

        followers = int(data['followers'])
        following = int(data['following'])
        posts = int(data['posts'])
        bio_length = int(data['bio_length'])
        profile_pic = int(data['profile_pic'])

        # Simple logic
        if followers < 100 and posts < 10:
            result = "Fake Profile"
            confidence = 0.9
        else:
            result = "Real Profile"
            confidence = 0.85

        return jsonify({
            "result": result,
            "confidence": confidence
        })

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True)