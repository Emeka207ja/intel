import React, { useState, useEffect } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import './updateProof.css'
const UpdatePayment = () => {
    const { userInfo } = useSelector(state => state.login)
    const navigate = useNavigate()
    const [intel,setIntel] = useState()
    const [status, setStatus] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const [updating, setUpdating] = useState(false)
    const [updateError, setUpdateError] = useState()
    const [success, setSuccess] = useState()
    // const { loading, paymentInfo, error } = useSelector(state => state.fetchSinglePaymentProof)
    
    
   
    const { id } = useParams()

    const fetchUpdate = async () => {
        const userInfo = localStorage.getItem('loggedIn') ? JSON.parse(localStorage.getItem("loggedIn")) : null
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization :`Bearer ${userInfo.token}`
                }
            }
            setLoading(true)
            const { data } = await axios.get(`/api/admin/payment/${id}`, config)
            setStatus(data.status)
            setIntel(data.user[0].intel)
            console.log(data)
            setLoading(false)

        } catch (error) {
            setError(error.response.data.message)
            setLoading(false)
        }
    }
    const updatePayment = async (e) => {
        e.preventDefault()
        const userInfo = localStorage.getItem('loggedIn') ? JSON.parse(localStorage.getItem("loggedIn")) : null
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization :`Bearer ${userInfo.token}`
                }
            }
            setUpdating(true)
            const {data} = await axios.put(`/api/admin/payment/${id}`,{status},config)
            setSuccess(data)
            console.log(data)
            setUpdating(false)
        } catch (error) {
            setUpdateError(error.response.data.message)
            setUpdating(false)
        }
    }
    useEffect(() => {
        fetchUpdate()
        // if (!userInfo.token ) {
        //     Navigate("/register")
        // }
        // else if (userInfo.token && !userInfo.isAdmin) {
        //     navigate("/profile")
        // }
    }, [id,userInfo])
  return (
      <>
          <div className='py-5 update__container'>
              {
                  loading ? <p className='update__loading'>loading...</p> : error? <p className='update__error'>{ error}</p>: (
                     <form className='container' onSubmit={updatePayment}>
                          {updating && <p className='updating'>updating...</p>}
                          {success&& <p>success</p>}
                        
                          <div className='form-group'>
                              <label htmlFor='status'>update payment status</label>
                            <input type= 'text' name='status' id='status' className='form-control' value={status} onChange={(e)=>setStatus(e.target.value) }/>
                        </div>
                        <button className='btn btn-primary mt-2'>update</button>
                     </form>
                  )
              }
          </div>
      </>
  )
}

export default UpdatePayment