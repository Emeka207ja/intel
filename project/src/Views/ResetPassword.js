import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from"axios"

const ResetPassword = () => {
  const { id } = useParams()
  
  const [password,setPassword] = useState()
  const [password2, setPassword2] = useState()
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState()
  const [response, setResponse] = useState()
  const [valid, setValid] = useState(true)

  const handlePasswordReset = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      if (password?.length<6||password2 !== password) {
        setValid(false)
        setLoading(false)
        return
      }
      const { data } = await axios.put(`/api/user/resetpassword/${id}`, { password })
      console.log(data)
      setResponse(data.message)
      setLoading(false)
      setValid(true)
      setPassword("")
      setPassword2("")
    } catch (error) {
      console.log(error)
      setError(error.response.data.message)
      setLoading(false)
      setValid(true)
    }
  } 
  return (
    <div>
      <form className='container' onSubmit={handlePasswordReset}>
       
        <h2 className='mt-2 text-info'>Password Reset</h2>
          {loading && <p className='text-info'>updating...</p>}
          {!valid &&!loading && <p className='text-danger'>please check make sure password matches and about 6 characters</p>}
          {error && <p className='text-danger'>{error}</p>}
          {response && <p className='text-primary'>{response }</p>}
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
         
          <input className='form-control' id='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
           <span> Password must be up to 6 characters</span>
        </div>
        <div className='form-group'>
          <label htmlFor='password2'>Confirm Password</label>
          <input className='form-control' id='password2' type='password' value={password2} onChange={(e)=>setPassword2(e.target.value)}/>
        </div>
        <button className='btn btn-primary mt-2'>submit</button>
      </form>
    </div>
  )
}

export default ResetPassword