import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate,Link} from 'react-router-dom'
import { loginAction } from '../../Actions/LoginAction'
import './login.css'
const Login = () => {
  const [password,setPassword] = useState()
  const [email, setEmail] = useState()

  const navigate = useNavigate()
  const dispatch = useDispatch()
 const {loading,success,error,userInfo}= useSelector(state=>state.login)
/// handler
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(loginAction(email, password))
  }
  useEffect(() => {
    if (userInfo) {
      navigate("/profile")
    }
  },[userInfo])
  return (
    <div className='container-fluid login_container'>
      <div className=' container'>
        {loading&& <p className='login__loading'>logging in...</p>}
        {error && <p className="login__error">{error }</p>}
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label>email</label>
            <input type='email' className='form-control' placeholder='please input your email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
          </div>
          <div className='form-group'>
            <label>password</label>
            <input type='password'className='form-control' placeholder='please input your password' onChange={(e)=>setPassword(e.target.value)}/>
          </div>
          <button className='form-control btn btn-primary mt-2'>login</button>
         <Link to='/forgotpassword'>Forgot Password</Link>
        </form>
      </div>
    </div>
  )
}

export default Login