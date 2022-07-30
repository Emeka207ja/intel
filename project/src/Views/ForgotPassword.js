import React,{useState} from 'react'

const ForgotPassword = () => {
  const [email,setEmail] = useState()
  return (
    <div className='forgot_password__container container py-5'>
      <p>please input your registration email</p>
      <form>
        <div className='form-group'>
          <input className='form-control' type='email' value={email} onChange={(e)=>setEmail(e.target.value) } placeholder='input your email'/>
        </div>
        <button className='btn btn-primary mt-1'>submit</button>
      </form>
    </div>
  )
}

export default ForgotPassword