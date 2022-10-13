import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Marquee from "react-fast-marquee";
import axios from 'axios'
import './profile.css'
import Marques from './Marques'
import MarqueEth from './MarqueEth'
import MarqueeUsdt from './MarqueeUsdt'
import MarqueeLTC from './MarqueeLTC'
import MarqueMatic from './MarqueMatic';
// import {fetchUserProfile} from "../Actions/loginAction"
import {fetchUserProfile} from "../../../Actions/LoginAction"

const Profile = () => {
    const [image, setImage] = useState()
    const [ImgLoading, setLoading] = useState(false)
    const [ImgError, setError] = useState()
    const [ImgSuccess, setImageSuccess] = useState()
    const [formLoading,setFormLoading] =useState(false)
    const [formError, setFormError] = useState()
    const [wallet, setWallet] = useState()
    const [proof, setProof] = useState()
    const [coin,setCoin] = useState()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loading, error, userInfo, success } = useSelector(state => state.login)
    const { profile } = useSelector(state => state.fetchProfile)

    const fetchCoinHandler = async() => {
        try {
           const config ={
               headers: {
                   "Content-type": "application/json",
                   Authorization:`Bearer ${userInfo.token}`
            }
           }
            const { data } = await axios.get(`/api/user/coin/${userInfo._id}`, config)
            setCoin(data)
        //    console.log(data)
       } catch (error) {
        console.log(error.response)
       }
   }
    useEffect(() => {
        if (!userInfo) {
            navigate("/login")
        }
        fetchCoinHandler()
        dispatch(fetchUserProfile(userInfo?._id))
        
    }, [userInfo, navigate])
    
    const handleFile = async (e) => {
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
           }
        }
        const image = e.target.files[0]
        const formData = new FormData()
        
        formData.append("file", image)
        formData.append("upload_preset", "demoReg")
        formData.append("cloud_name", "do133axxb")
        
        try {
            setLoading(true)
            const { data } = await axios.post(" https://api.cloudinary.com/v1_1/do133axxb/image/upload", formData, config)
            setImage(data.url)
            console.log(data.url)
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
    const navigateToPaystackPage = () => {
        navigate(`/paystack/${userInfo?._id}`)
    }
    const navigateToPaymentHistory = () => {
        navigate(`/paymenthistory/${userInfo?._id}`)
    }
  return (
      <div className='profile__container'>
         
             <div className=" profile" >
              <div className='profile__img'> <img className="card-img-top profile__img" src={userInfo && userInfo.image} alt="Card image cap" /></div>
             
              <div className="card-body profile__body">
                  
                  <h5 className="card-title">welcome { userInfo&& userInfo.email}</h5>
                        {/* <p className="card-text">portfolio : 0 intel wave</p> */}
                        <p className="card-text">user id : { profile?._id}</p>
                        <p className="card-text">intelwave portfolio : {profile?.intel}</p>
                        <p className="card-text">referral bonus : {profile?.referal}</p>
                       
                    </div>
              </div>
          
          <div className="payment_section card text-center ">
             
             
              <Marquee className='react_marquee' speed={50} >
                  <MarqueeLTC />
                  <Marques />
                  <MarqueEth />
                   <MarqueeUsdt />
                   <MarqueMatic />
              </Marquee>
              {/* <marquee></marquee> */}
                    <div className="card-header">
                       <h5>Intel Purchase Guideline</h5>
              </div>
              <div className='card-body'>
                  <ol>
                      <li>
                          highlight and copy the trc20 USDT address below and make payment according to the pre-sale price 
                          <p>TM6RRFfBMRxhQiM6HXLemoqA8akg7Cbu14</p>
                      </li>
                      <li>
                          after payment, submit your proof of payment in the form below
                      </li>
                      <span className='text-danger'>* Please do not submit proof of payment, if you paid through paystack</span>
                  </ol>
                  <button className='btn btn-primary' onClick={navigateToPaystackPage}>PAY WITH CARD</button>
              </div>
                    <div className="card-header">
                       <h5>Payment Verification</h5>
                    </div>
                    <div className="card-body">
                  <div className="card-title">
                      {formLoading ? <p className='payment__loading'>submitting payment information</p> : formError ? <p className='payment__error'>{formError}</p> : proof && <p className='payment__success'>{ proof}</p>  }
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
                  <div>
                      
                  </div>
                    <button className= "btn btn-primary mt-3" onClick= {navigateToPaymentHistory}> VIEW PAYMENT HISTORY</button>
                  </div>
              <div className="card-footer text-muted">
                  <h3>Contact Admin</h3>
                  <div>
                      <a href='mailto:intelwaver@gmail.com'>Send Email</a>
                      {/* <p><a href='https://t.me/intelwave1'>chat admin</a></p> */}
                  </div>

                        powered by Intel
              </div>
             
           </div>
    </div>
  )
}

export default Profile