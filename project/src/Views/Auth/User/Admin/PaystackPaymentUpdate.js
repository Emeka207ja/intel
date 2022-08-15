import React,{useState,useEffect} from 'react'
import { useParams,Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from "axios"
import "../paymentHistory.css"
const PaystackPaymentUpdate = () => {
    const { id } = useParams()
    const { userInfo } = useSelector(state => state.login)
    
    const [status,setStatus] = useState("pending")
    const [adminApproved,setAdminApproved] = useState("false")
    const [loading,setLoading] = useState(false)
    const [feedback,setFeedback] = useState()
    const [error,setError] = useState()
    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const Config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization : `Bearer ${userInfo?.token}`
                }
            }
            const { data } = await axios.put(`/api/admin/paystack/${id}`, { status, adminApproved }, Config)
            setFeedback(data.message)
            setLoading(false)
            console.log(data)
        } catch (error) {
            setLoading(false)
            console.log(error.response.data.message)
       }
    }
  return (
    <div>
          <div className='container py-5'>
              <h3>User {id}</h3>
              {
                  loading&&<p className='paystack_update__loading'>loading</p>
              }
              {
                  error && <p className='paystack_update__error'>{ error}</p>
              }
              {
                  feedback && <p className='paystack_update__success'>{ feedback}</p>
              }
              <form onSubmit={handleUpdate}>
                  <div className='form-group mb-3'>
                      <label>Update Status</label>
                      <select className='form-select' value={status} onChange={(e)=>setStatus(e.target.value) }>
                          <option value="pending">Pending</option>
                          <option value="processed">Processed</option>
                      </select>
                  </div>
                  <div className='form-group'>
                      <label>Admin Approved</label>
                      <select className='form-select' value={ adminApproved} onChange={(e)=>setAdminApproved(e.target.value)}>
                          <option value="false">Not-Approved</option>
                          <option value="true">Approved</option>
                      </select>
                  </div>
                  <button className='btn btn-primary mt-3'>Submit</button>
              </form>
              <Link to="/paystackhistory">Go back</Link>
         </div>
    </div>
  )
}

export default PaystackPaymentUpdate
