import React, { useState,useEffect } from 'react'
import {Link} from 'react-router-dom'
import bgimage from '../Img/intel.jpg'

import axios from 'axios'
import './register.css'
const Register = () => {
  const [image, setImage] = useState()
  const [firstname, setFirstname] = useState()
  const [lastname, setLastname] = useState()
  const [email, setEmail] = useState()
  const [referral, setReferral] = useState()
  const [password, setPassword] = useState()
  const [password2, setPassword2] = useState()
  const [passMatch,setPassMatch] = useState(true)
  const [success, setSuccess] = useState()
  const [loading, setLoading] = useState(false)
  const [imageLoading, setImageLoading] = useState(false)
  const [imageError, setImageError] = useState()
  const [signUpError, setSignUpError] = useState()
  const [imageSuccess, setImageSuccess] = useState(false)

  const handleFile = async(e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append("image", file)
    const config = {
          headers: {
            "Content-Type":"multipart/form-data"
          }
        }
    try {
        setImageLoading(true)
      const { data } = await axios.post("/api/profile", formData, config)
      
        if (data) {
          setImage(data)
      }
      setImageLoading(false)
      setImageSuccess(true)
    } catch (error) {
      setImageLoading(false)
      setImageError(error.response.data.message)
      setImageSuccess(false)
      console.log('error',error.response.data.message)
    }
   

  } 
  // useEffect(() => {
  //   handleFile()
  // },[imageSuccess,imageLoading,imageError])
  const handleSignUp = async(e) => {
    e.preventDefault()
    try {
      setLoading(true)
      if (password !== password2) {
        setPassMatch(false)
        setLoading(false)
        return
      }
     const { data } = await axios.post("/api/user", { firstname, lastname, email, image, password,referral })
     if (data) {
       setSuccess(data.message)
      }
      setPassMatch(true)
      setLoading(false)
      console.log("success",data)
      
   } catch (error) {
      setLoading(false)
      setPassMatch(true)
      setSignUpError(error.response.data.message)
      console.log(error.response.data.message)
    }
    setFirstname('')
    setLastname('')
    setEmail('')
    setPassword('')
    setPassword2('')
    setImage('')
    setReferral("")
  }
  return (
    <div className='container-fluid py-4'>
      <div className='container'>
        <form onSubmit={handleSignUp}>
          <h3>PLEASE FILL THIS FORM</h3>
          {loading &&<p className='signup__loading'>signing up....</p>}
          {success && <p className='signup__success'>{success}</p>}
          {signUpError && <p className='signup__error'>{signUpError}</p>}
          {!passMatch &&<p className='signup__error'>password does not match</p>}
          <div className='form-group'>
            <label className='mb-2 mt-1' htmlFor='firstname'>Firstname</label>
            <input className='form-control' id='firstname' name='firstname' onChange={(e) => setFirstname(e.target.value)} value={firstname }/>
          </div>
          <div className='form-group'>
            <label className='mb-2 mt-1' htmlFor='lastname'>Lastname</label>
            <input className='form-control' id='lastname' name='lastname' onChange={(e) => setLastname(e.target.value)} value={lastname}/>
          </div>
          <div className='form-group'>
            <label className='mb-2 mt-1' htmlFor='password'>Password</label>
            <input className='form-control' id='password' name='password' type='password' onChange={(e) => setPassword(e.target.value)} value={password}/>
          </div>
          <div className='form-group'>
            <label className='mb-2 mt-1' htmlFor='password'>Confirm Password</label>
            <input className='form-control' id='password' name='password' type='password' onChange={(e) => setPassword2(e.target.value)} value={password2}/>
          </div>
          <div className='form-group'>
            <label  className='mb-2 mt-1' htmlFor='email'>Email</label>
            <input className='form-control' type='email' id='email' name='email' onChange={(e) => setEmail(e.target.value)} value={email}/>
          </div>
          <div className='form-group'>
            <label  className='mb-2 mt-1' htmlFor='email'>Who reffered you?</label>
            <input className='form-control' type='email' id='email' placeholder='input your referral email' name='email' onChange={(e) => setReferral(e.target.value)} value={referral}/>
          </div>
          <div className='mt-2'>
            {imageLoading&& <p className='image__loading'>fetching image...</p>}
            {imageError&&<p className="image__error">{imageError}</p> }
            {imageSuccess&& <p className='image__success'>image selected</p>}
          </div>
          <div className='form-group'>
            <label htmlFor='file' className='mb-2'>DISPLAY PICTURE</label>
            <input className='form-control' id='file' name='file' type='file' onChange={handleFile }/>
          </div>
          <button className='btn btn-primary form-control mt-2' disabled={imageLoading?true:false}>submit</button>
        </form>
        <div>Already have an account? <Link to ='/login'>Click here</Link> </div>
      </div>
     
    </div>
  )
}

export default Register