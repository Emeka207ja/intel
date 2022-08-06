import React, { useState } from 'react'
import axios from "axios"

const ForgotPassword = () => {
 
  const [email,setEmail] = useState()
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState()
  const [response, setResponse] = useState()
  
   const handlePasswordReset = async (e) => {
     e.preventDefault()
    try {
      setLoading(true)
      const { data } = await axios.post("/api/user/forgotpassword", { email })
      setResponse(data.message)
      setLoading(false)
    } catch (error) {
      setError(error.response.data.message)
       setLoading(false)
    }
  }
  return (
    <div className='forgot_password__container container py-5'>
      <p>please input your registration email</p>
      {loading && <p className='text-info'>loading...</p>}
      {response && <p className='text-primary'>{response }</p>}
      {error && <p className='text-danger'>{error }</p>}
      <form onSubmit={handlePasswordReset}>
        <div className='form-group'>
          <input className='form-control' type='email' value={email} onChange={(e)=>setEmail(e.target.value) } placeholder='input your email'/>
        </div>
        <button className='btn btn-primary mt-1'>submit</button>
      </form>
    </div>
  )
}

export default ForgotPassword