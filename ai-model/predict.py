import sys
import pickle
import numpy as np

try:
    # Load model
    model = pickle.load(open("C:/Users/reddy/AI-fake-profile-detection/ai-model/model.pkl", "rb"))
    # Get input from Node.js
    followers = int(sys.argv[1])
    following = int(sys.argv[2])
    posts = int(sys.argv[3])
    bio_length = int(sys.argv[4])
    profile_pic = int(sys.argv[5])

    # Prepare data
    data = np.array([[followers, following, posts, bio_length, profile_pic]])

    # Predict
    prediction = model.predict(data)

    # Output result
    if prediction[0] == 1:
        print("Fake Profile")
    else:
        print("Real Profile")

except Exception as e:
    print("Error:", str(e))