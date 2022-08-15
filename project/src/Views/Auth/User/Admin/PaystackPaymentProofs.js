import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import formatDistance from "date-fns/formatDistance"
import "../paymentHistory.css"

const PaystackPaymentProofs = () => {
    const { userInfo } = useSelector(state => state.login)
    
    const [loading,setLoading] = useState(false)
    const [paymentInfo,setPaymentInfo] = useState()
    const [error, setError] = useState()
    const [deleting,setDeleting] = useState(false)
    const [deleteFeedback,setDeleteFeedback] = useState()
    const [deleteFailed,setDeleteFailed] = useState()
    const navigate = useNavigate()

    const fetchPaystackPaymentsHandler = async () => {
        try {
            setLoading(true)
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${userInfo?.token}`
                }
            }
            const { data } = await axios.get("/api/payment/paystack/admin", config)
            setPaymentInfo(data)
            setLoading(false)
            console.log(data)
        } catch (error) {
            setError(error.response.data.message)
            setLoading(false)
            console.log(error.response.data.message)
        }
    }
    useEffect(() => {
        fetchPaystackPaymentsHandler()
    }, [deleting])

    const navigateToPaystackPaymentUpdate = (id) => {
        navigate(`/updatepaystack/${id}`)
    }
    const deletePaystackPayment = async (id) => {
        try {
            setDeleting(true)
            if (window.confirm("are you sure?") === true) {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${userInfo?.token}`
                    }
                }
                const { data } = await axios.delete(`api/admin/paystack/${id}`, config)
                setDeleteFeedback(data.message)
                setDeleting(false)
                console.log(data)
            }
        } catch (error) {
            console.log(error.response.data.message)
            setDeleteFailed(error.response.data.message)
            setDeleting(false)
       }
    }
  return (
      <div>
          {deleteFeedback && <p className='paystack_update__success'>{deleteFeedback}</p>}
          <div className='payment_history__container'>
              {/* {deleting && <p>deleting</p>} */}
              
              {deleteFailed && <p>{ deleteFailed}</p>}
              {
                  loading ? <p className='payment_history__loading'>Loading</p> : error ? <p>{ error}</p> :paymentInfo?.map((el, idx) => {
                      return (
                          <div className='payment_history__item' key={idx}>
                              <p> Client Email : {el.user.email }</p>
                              <p> Amount Paid : {el.Amount }</p>
                              <p> Payment Channel : {el.paymentMethod }</p>
                              <p> Ref No : {el.payment_reference }</p>
                              <p> Client Wallet : {el.user.wallet }</p>
                              <p> Status : {el.status }</p>
                              <p> Ticket Created : {
                              formatDistance(
                                  new Date(el.createdAt),
                                  new Date(),
                                 { addSuffix:true}
                              )
                              }</p>
                              <div>
                                  <button className='btn btn-primary' onClick={()=>navigateToPaystackPaymentUpdate(el.payment_reference)}>Update</button>
                                  <button className="btn btn-danger" onClick={()=>deletePaystackPayment(el.payment_reference)} >Delete</button>
                              </div>
                          </div>
                      )
                  })
              }
          </div>
      {/* <h3>Paystack proofs</h3> */}
    </div>
  )
}

export default PaystackPaymentProofs
