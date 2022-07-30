import React, {useState} from 'react'
import axios from 'axios'

const About = () => {
  const [image, setImage] = useState()
  const handleFile = async(e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append("image", file)
    const config = {
      headers: {
        "Content-Type":"multipart/form-data"
      }
    }
    const { data } = await axios.post("/api/profile",  formData , config)
    console.log(data)
  }
  return (
    <div>
      <form>
        <input type='file'onChange={handleFile} />
      </form>
      <img src={`/uploads\image-1657558741986.jpg`}/>
    </div>
  )
}

export default About