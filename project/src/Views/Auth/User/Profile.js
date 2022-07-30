import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './profile.css'

const Profile = () => {
    const [image, setImage] = useState()
    const [ImgLoading, setLoading] = useState(false)
    const [ImgError, setError] = useState()
    const [ImgSuccess, setImageSuccess] = useState()
    const [formLoading,setFormLoading] =useState(false)
    const [formError, setFormError] = useState()
    const [wallet, setWallet] = useState()
    const [proof,setProof] = useState()
    const navigate = useNavigate()
    const { loading, error, userInfo, success } = useSelector(state => state.login)
    useEffect(() => {
        if (!userInfo) {
            navigate("/login")
        }
    }, [userInfo, navigate])
    
    const handleFile = async (e) => {
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization:`Bearer ${userInfo.token}`
           }
        }
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append("image",file)
        try {
            setLoading(true)
            const { data } = await axios.post("/api/profile", formData, config)
            setImage(data)
            console.log(data)
            setLoading(false)
        } catch (error) {
            setError(error.response.data.message)
            setLoading(false)
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization:`Bearer ${userInfo.token}`
           }
        }
        try {
            setFormLoading(true)
            const { data:{message} } = await axios.post("/api/payment", { wallet, image }, config)
            setProof(message)
            console.log(message)
            setFormLoading(false)
        } catch (error) {
            setFormError(error.response.data.message)
            setFormLoading(false)
            
        }
    }
  return (
      <div className='profile__container'>
         
             <div className=" profile" >
                   <div className='profile__img'> <img className="card-img-top profile__img" src={`/profile${userInfo&&userInfo.image}`} alt="Card image cap"/></div>
                    <div className="card-body profile__body">
                  <h5 className="card-title">welcome { userInfo&& userInfo.email}</h5>
                        {/* <p className="card-text">portfolio : 0 intel wave</p> */}
                        <p className="card-text">user id : { userInfo&& userInfo._id}</p>
                        <p className="card-text">intelwave portfolio : { userInfo&& userInfo.intel}</p>
                        <p className="card-text">referral bonus : { userInfo&& userInfo.referal}</p>
                       
                    </div>
              </div>
          
                <div className="card text-center">
                    <div className="card-header">
                       Payment verification
                    </div>
                    <div className="card-body">
                  <div className="card-title">
                      {formLoading ? <p className='payment__loading'>submitting payment information</p> : formError ? <p className='payment__error'>{formError}</p> : proof ? <p className='payment__success'>{ proof}</p> : <p>make payment to this wallet address 0x1279A923012fcd7cEADcE7e4d54E9D4A19251E91 after payment, submit your proof of payment in the form below</p>}
                  </div>
                  
                        <form className='container' onSubmit={handleSubmit}>
                            <div className='form-group'>
                          <input className='form-control' placeholder='input your wallet address to receive your purchased coin' value={wallet} onChange={ (e)=>setWallet(e.target.value)} />
                      </div>
                      <div>
                          {ImgLoading && <p className='image__loading'>uploading image please wait...</p>}
                          {image && <p className='image__success'>selected! </p>}
                          {ImgError && <p className='image__error'>{ImgError }</p>}
                      </div>
                            <div className='form-group mt-2'>
                                <input type='file'className='form-control' onChange={handleFile} />
                            </div>
                            <button className='form-control btn btn-primary mt-2' disabled={ImgLoading?true:false}>submit details</button>
                        </form>
                    </div>
              <div className="card-footer text-muted">
                  <h3>Contact Admin</h3>
                  <div>
                      <a href='mailto:intelwave1@gmail.com'>Send Email</a>
                      <p><a href='https://t.me/intelwave1'>chat admin</a></p>
                  </div>

                        powered by Intel
              </div>
             
           </div>
    </div>
  )
}

export default Profile