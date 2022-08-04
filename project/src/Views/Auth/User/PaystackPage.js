import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector,useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import PaystackPop from '@paystack/inline-js'
import { postPaystackPaymentAction } from '../../../Actions/PaymentAction'
const PaystackPage = () => {
    const {id}= useParams()
    const { loading, error, userInfo } = useSelector(state => state.login)
    const {error:payError,loading:payLoading,paymentInfo} = useSelector(state=>state.paystackPayment)
    const dispatch = useDispatch()

    const [paystackKey, setPaystackKey] = useState()
    const [success,setSuccess]= useState()
    const [valid,setValid]= useState(true)
    const [firstname,setFirstname]=useState()
    const [lastname,setLastname]=useState()
    const [email,setEmail]=useState()
    const [amount, setAmount] = useState()
    
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
        } catch (error) {
            console.log(error)
        }
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
    }, [])
    if (payError) {
        console.log(payError)
    }
    if (paymentInfo) {
        console.log('paymentdetails',paymentInfo)
    }
    //paystack intergration function
    const payWithPaystack = (e) => {
        e.preventDefault()
        if (!amount) {
            setValid(false)
            return
        }
        const paystack = new PaystackPop()
        setValid(true)
        paystack.newTransaction({
            key: paystackKey,
            amount:amount*100,
            email,
            firstname,
            lastname,
            onSuccess(transaction) {
                 dispatch(postPaystackPaymentAction(transaction.status,transaction.reference,amount))
                setSuccess(transaction)
                setAmount("")
                let message = ` payment complete! reference Id ${transaction.reference}`
               
                alert(message)
            },
            onCancel() {
                alert("you have cancelled a payment")
                setAmount("")
            }
       })
    }
    if (success) {
        console.log(success)
    }
  return (
      <div className='container'>
          <form className='py-3' onSubmit={payWithPaystack}>
              {!valid&&<p className='text-danger'>please fill out the payment form correctly</p>}
              <div className='form-group'>
                  <label>Amount</label>
                  <input className='form-control' type='number' value={amount} onChange={(e)=>setAmount(e.target.value) } />
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