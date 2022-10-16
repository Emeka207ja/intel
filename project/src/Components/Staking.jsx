import React, { useEffect, useState } from 'react'
import Message from "./Message"
import Loader from "./Loader"
import formatDistance from "date-fns/formatDistance"
import  subDays from "date-fns/formatDistance"
import {Form,Col,Row,Button,Container,Image} from "react-bootstrap"

const Staking = ({ Loading, Error, stake }) => {
  const [rate, setRate] = useState(0)
  const [amount, setAmount] = useState(0)
  const [roi, setRoi] = useState(0)

  useEffect(() => {
   
  }, [])
  const calculateRoi = (rate, amt) => {
    setRoi(rate*amt)
  }
  console.log("rate", rate)
  console.log("amount",amount)
  let nextEvent = new Date()
  nextEvent.setDate(nextEvent.getSeconds() + 2)
  return (
    <div className='stakes_container'>
      <h3>Stakes</h3>
      {
        Loading ? <Loader /> : Error ? <Message text={Error} /> : <div>
          {
            stake?.map(el => {
              return (
                <div className='stakes_item'>
                  <p>Amount: {el.amount}</p>
                  <p>Rate :{el.rate}%</p>
                  <p>Duration(days) : {el.duration}</p>
                  <p> ROI:{(el.rate*el.amount*el.duration)/100*12}</p>
                  {/* <p>Due date : {  new Date(date.setDate(date.getDate()+ el.duration)).toLocaleDateString()}</p> */}
                 
                </div>
              )
            })
         }
        </div>
      }
     </div>
  )
}

export default Staking