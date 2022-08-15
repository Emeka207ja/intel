import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector,useDispatch } from 'react-redux'
import { Link,useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import PaystackPop from '@paystack/inline-js'
import { coinUpdateHandler, postPaystackPaymentAction } from '../../../Actions/PaymentAction'
const PaystackPage = () => {
    const {id}= useParams()
    const { loading, error, userInfo } = useSelector(state => state.login)
    const {error:payError,loading:payLoading,paymentInfo} = useSelector(state=>state.paystackPayment)
    const { error: coinErr, coinVal } = useSelector(state => state.coinUpdate)
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [paystackKey, setPaystackKey] = useState()
    const [success,setSuccess]= useState()
    const [valid,setValid]= useState(true)
    const [validCoin,setValidCoin]= useState(false)
    const [firstname,setFirstname]=useState()
    const [lastname,setLastname]=useState()
    const [email,setEmail]=useState()
    const [amount, setAmount] = useState()
    const [coin, setCoin] = useState()
    const [amountVal, setAmountVal] = useState(0.00)
    
    const fetchPaystackKey = async () => {
        const config = {
            headers: {
                "Content-type": "application-json",
                Authorization: `Bearer ${userInfo?.token}`
            }
        }
        try {
            const { data } = await axios.get("/api/user/paystack", config)
            setPaystackKey(data)
        } catch (coinVal) {
            console.log(coinVal)
        }
    }

    // const coinConversion = () => {
    //     if (amount < 2000) {
    //         return
    //     }
    //     const coinVal = amount/3.77
    //     setCoin(coinVal)
    // }
    if (coinErr) {
        console.log("err",coinErr)
    }
    const fetchDetails = async () => {
        try {
            // setLoading(true)
             const config = {
                 headers: {
                "Content-Type": "application/json",
                Authorization:`Bearer ${userInfo.token}`
            }
            }
            const { data } = await axios.get(`/api/user/updateprofile/${id}`,config)
            setFirstname(data.firstname)
            setLastname(data.lastname)
            setEmail(data.email)
            // setLoading(false)
        } catch (error) {
            console(error)
            // setError(error.response.data.message)
            // setLoading(false)
        }
    }
    useEffect(() => {
        fetchPaystackKey()
        fetchDetails()
         const coinVal = amount/3.77
         const formatedCoin = coinVal.toFixed(2)
        setCoin(formatedCoin)
        setAmountVal(formatedCoin)
    }, [amount])
    if (payError) {
        console.log(payError)
    }
    
    //paystack intergration function
    const payWithPaystack = (e) => {
        e.preventDefault()
        if (!amount||amount<2000 ) {
            setValid(false)
            return
        }
        
        // console.log("coin",formatedCoin)
        const paystack = new PaystackPop()
        setValid(true)
        paystack.newTransaction({
            key: paystackKey,
            amount:amount*100,
            email,
            firstname,
            lastname,
            onSuccess(transaction) {
                dispatch(postPaystackPaymentAction(transaction.status, transaction.reference, amount))
                dispatch(coinUpdateHandler(coin,id))
                setSuccess(transaction)
                 console.log("coin",coin)
                setAmount("")
                let message = ` payment complete! reference Id ${transaction.reference}`
               
                alert(message)
               navigate(`/paymenthistory/${id}`)
            },
            onCancel() {
                alert("you have cancelled a payment")
                setAmount("")
            }
       })
    }
    // if (success) {
    //     console.log(success)
    // }
  return (
      <div className='container'>
          <form className='py-3' onSubmit={payWithPaystack}>
              {!valid&&<p className='text-danger'>please fill out the payment form correctly </p>}
              <div className='form-group'>
                  <label>Amount</label>
                  <span className='m-2 text-danger'>{amount>=2000?"":"Least amount accepted is N2000"} </span>
                  <input className='form-control' type='number' value={amount} onChange={(e) => setAmount(e.target.value)} />
                  <p className='mt-2'>Equi: <span className={amount>=2000?"text-primary":"text-danger"}>{amountVal } Intel</span> </p>
              </div>
              <div className='form-group'>
                  <label>Firstname</label>
                  <input className='form-control' type='text'  value={firstname} onChange={(e)=>setFirstname(e.target.value) }/>
              </div>
              <div className='form-group'>
                  <label>Lastname</label>
                  <input className='form-control' type='text'  value={lastname} onChange={(e)=>setLastname(e.target.value) }/>
              </div>
              <div className='form-group'>
                  <label>Email</label>
                  <input className='form-control' type='email'  value={email} onChange={(e)=>setEmail(e.target.value) }/>
              </div>
              <button className='btn btn-primary mt-2 form-control' type='submit'>PAY</button>
              <div>
                  <Link to="/profile">Go back</Link>
              </div>
          </form>
    </div>
  )
}

export default PaystackPage