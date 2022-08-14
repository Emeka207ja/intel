import React, { useState, useEffect } from 'react'
import axios from "axios"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import formatDistance from "date-fns/formatDistance"
import "./paymentHistory.css"

const PaymentHistory = () => {
    const {userInfo} = useSelector(state=>state.login)
    const [loading,setLoading] = useState(false)
    const [paymentData,setPaymentData] = useState()
    const [error,setError] = useState()
    // const [] = useState()
    const { id } = useParams()
    
    const fetchPaystackPaymentsHandler = async () => {
        try {
            setLoading(true)
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${userInfo?.token}`
                }
            }
            const { data } = await axios.get("/api/payment/paystack", config)
            setPaymentData(data)
            setLoading(false)
            // console.log(data)
        } catch (error) {
            setLoading(false)
            console.log(error.response.data.message)
        }
    }
    useEffect(() => {
        fetchPaystackPaymentsHandler()
    },[])
  return (
      <div>
          <div className='payment_history__container'>
              {loading?<p  className='payment_history__loading'>Loading</p>: paymentData?.map((el, idx) => {
                  return (
                      <div className='payment_history__items'>
                          <h5><span> Receipt #{idx+1 }</span></h5>
                          <p>Payment Method: {el.paymentMethod}</p> 
                          <p>Paystack Reference Id: {el.payment_reference} </p>
                          <p>Amount Paid: &#8358; {el.Amount} </p>
                          <p>Payment Status: {el.payment_status} </p>
                          <p>Approval Status: {el.status} </p>
                          <p> Wallet Status: {el.adminApproved ? "YES" : "Intel not yet sent to wallet yet,will be proccessed shortly"} </p>
                          <p> Ticket Created : {
                              formatDistance(
                                  new Date(el.createdAt),
                                  new Date(),
                                 { addSuffix:true}
                              )
                          }</p>
                      </div>
                  )
              })}
          </div>
          {/* <h3>payment history {id} { userInfo?.token }</h3> */}
    </div>
  )
}

export default PaymentHistory
