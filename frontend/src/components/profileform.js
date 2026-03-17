import React, { useState } from "react"
import axios from "axios"

function ProfileForm() {

const [followers, setFollowers] = useState("")
const [following, setFollowing] = useState("")
const [posts, setPosts] = useState("")
const [bio, setBio] = useState("")
const [pic, setPic] = useState("")

const [result, setResult] = useState("")

const handleSubmit = async (e) => {
e.preventDefault()

const response = await axios.post(
"http://localhost:5000/detect",
{
followers: followers,
following: following,
posts: posts,
bio_length: bio,
profile_pic: pic
}
)

setResult(response.data.result)
}

return (

<div>

<h2>AI Fake Profile Detection</h2>

<form onSubmit={handleSubmit}>

<input
placeholder="Followers"
onChange={(e)=>setFollowers(e.target.value)}
/>

<br/><br/>

<input
placeholder="Following"
onChange={(e)=>setFollowing(e.target.value)}
/>

<br/><br/>

<input
placeholder="Posts"
onChange={(e)=>setPosts(e.target.value)}
/>

<br/><br/>

<input
placeholder="Bio Length"
onChange={(e)=>setBio(e.target.value)}
/>

<br/><br/>

<input
placeholder="Profile Picture (1 or 0)"
onChange={(e)=>setPic(e.target.value)}
/>

<br/><br/>

<button type="submit">
Detect Profile
</button>

</form>

<h3>{result}</h3>

</div>

)

}

export default ProfileForm