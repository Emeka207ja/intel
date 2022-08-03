import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { fetchUserProfile, updateUserProfile } from '../../../Actions/LoginAction'
import axios from "axios"
import './updateProfile.css'
const UpdateProfile = () => {
    const {id} = useParams()
    // const {  failed,updating } = useSelector(state => state.UpdateProfile)
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [firstname,setFirstname] = useState()
    const [lastname,setlastname] = useState()
    const [email,setEmail] = useState()
    const [password, setPassword] = useState()
    const [password2, setPassword2] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const [profile, setProfile] = useState()
    const [updating, setUpdating] = useState(false)
    const [updateError, setUpdateError] = useState()
    const [success,setSuccess] = useState()
    const [passMatch,setPassMatch] = useState(true)
    const [view,setView] = useState(false)
    const [view2,setView2] = useState(false)
    const {  userInfo } = useSelector(state => state.login)
    
    const fetchDetails = async () => {
        try {
            setLoading(true)
             const config = {
                 headers: {
                "Content-Type": "application/json",
                Authorization:`Bearer ${userInfo.token}`
            }
            }
            const { data } = await axios.get(`/api/user/updateprofile/${id}`,config)
            setFirstname(data.firstname)
            setlastname(data.lastname)
            setEmail(data.email)
            setLoading(false)
        } catch (error) {
            setError(error.response.data.message)
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchDetails()
        // dispatch(fetchUserProfile(id))
        if (!userInfo?.token) {
            navigate("/login")
        }
       
    }, [])

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            setUpdating(true)
            if (password !== password2) {
                setPassMatch(false)
                setUpdating(false)
                return
            }
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            const { data } = await axios.put(`/api/user/updateprofile/${id}`, { password, email, firstname, lastname }, config)
            setSuccess(data.message)
             setPassMatch(true)
            console.log(data)
            setUpdating(false)
        } catch (error) {
            setUpdateError(error.response.data.message)
            setUpdating(false)
        }
    }
  return (
      <div className='profile_container'>
          {loading ? <p className='update_profile__loading'>loading</p> : error ? <p className='update_profile__error'>{error}</p> : (
              <form className='container' onSubmit={handleUpdate}>
                  <h3>Profile</h3>
                  {updating? <p className='update_profile__loading'>updating</p>:success? <p  className='update_profile__success'>{ success}</p>:updateError && <p  className='update_profile__error'>{updateError }</p>}
                 
                  {!passMatch &&  <p  className='update_profile__error'>password does not match</p>}
                <div className='form-group'>
                    <label htmlFor='firstname'>FIRSTNAME</label>
                    <input className='form-control' id='firstname' name='firstname' value={firstname} onChange={(e)=>setFirstname(e.target.value) }/>
                </div>
                <div className='form-group'>
                    <label htmlFor=''>LASTNAME</label>
                    <input className='form-control' id='lastname' name='lastname' value={lastname} onChange={(e)=>setlastname(e.target.value) } />
                </div>
                <div className='form-group'>
                    <label htmlFor='email'>EMAIL</label>
                    <input className='form-control' id='email'type='email' name='email' value={email} onChange={(e)=>setEmail(e.target.value) }/>
                </div>
                <div className='form-group test'>
                    <label htmlFor='password'>PASSWORD</label>
                      <input className='form-control' type={view ? 'text' : "password"} id='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                      <span className='view_password' onClick={()=>setView(prev=>!prev)}><img src={view?"https://img.icons8.com/material-rounded/24/000000/visible.png": "https://img.icons8.com/ios-filled/50/000000/closed-eye.png"}  /></span>
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>CONFIRM PASSWORD</label>
                      <input className='form-control' type={view2?"text":"password"} id='password' name='password' value={password2} onChange={(e) => setPassword2(e.target.value)} />
                       <span className='view_password2'onClick={()=>setView2(prev=>!prev)}><img src={view2?"https://img.icons8.com/material-rounded/24/000000/visible.png": "https://img.icons8.com/ios-filled/50/000000/closed-eye.png"}  /></span>
                </div>
                <button className='btn btn-primary mt-2'>Update Profile</button>
          </form>
        //  <img src="https://img.icons8.com/ios-filled/50/000000/closed-eye.png"/>
          )}
    </div>
  )
}

export default UpdateProfile