import React, { useState, useEffect } from 'react'
import axios from "axios"
import {useParams} from 'react-router-dom'

const UpdateUser = () => {
  const [intel,setIntel] = useState()
  const [referal,setReferal] = useState()
  const [firstname,setFirstname] = useState()
  const [loading,setLoading] = useState(false)
  const [error, setError] = useState()
  const [updating, setUpdating] = useState(false)
  const [updateError, setUpdateError] = useState()
  const [success, setSuccess] = useState()
  const { id } = useParams()
  
  const fetchUser = async () => {
    const userInfo = localStorage.getItem('loggedIn') ? JSON.parse(localStorage.getItem('loggedIn')) : null
    try {
      setLoading(true)
      const config = {
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${userInfo.token}`
        }
      }
      const { data } = await axios.get(`/api/admin/user/${id}`, config)
      setIntel(data.intel)
      setReferal(data.referal)
      setFirstname(data.firstname)
      setLoading(false)
      console.log(data)
    } catch (error) {
      setError(error.response.data.message)
      setLoading(false)
      console.log(error)
    }
  }
  useEffect(() => { 
    fetchUser()
  }, [id])
  const handleUpdate = async (e) => {
    e.preventDefault()
    const userInfo = localStorage.getItem('loggedIn') ? JSON.parse(localStorage.getItem('loggedIn')) : null
    try {
      setUpdating(true)
      const config = {
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${userInfo.token}`
        }
      }
      const { data:{message} } = await axios.put(`/api/admin/user/${id}`, { intel, referal }, config)
      setSuccess(message)
      setUpdating(false)
    } catch (error) {
      setUpdateError(error.reponse.data.message)
       setUpdating(false)
    }
  }
  return (
    <div className='container py-3'>
      {
        loading ? <p>loading...</p> : error ? <p>{error}</p> : (
          <form onSubmit={handleUpdate}>
            {updating && <p>updating...</p>}
            {updateError && <p>{error}</p>}
            {success && <p>{success}</p>}
            <div className='form-group'>
              <input className='form-control' value={firstname}/>
            </div>
            <div className='form-group'>
              <label htmlFor='intel'>Intel Coin</label>
              <input className='form-control' type='text' name='intel' id='intel' value={intel} onChange={(e) => setIntel(e.target.value)} />
            </div>
            <div className='form-group'>
                <label htmlFor='intel'>Referral Bonus</label>
                <input className='form-control' type='text' name='referal' id='referal' value={referal} onChange={(e) => setReferal(e.target.value)} />
              </div>
            <button className="btn btn-primary mt-2">Update User</button>
       </form>)
      }
    </div>
  )
}

export default UpdateUser