import React, { useEffect, useState } from 'react'
import ReactInterval from 'react-interval';
import Message from "./Message"
import Loader from "./Loader"
import {Form,Col,Row,Button,Container,Image} from "react-bootstrap"

const Staking = ({ Loading, Error, stake }) => {
  const [rate, setRate] = useState(0)
  const [amount, setAmount] = useState(0)
  const [roi, setRoi] = useState(0)

  useEffect(() => {
    const val = JSON.parse(localStorage.getItem("rtns"))
    setRate(val)
  }, [localStorage.getItem("rtns")])
  console.log("rate", rate)
  console.log("amount",amount)
  let nextEvent = new Date()
  nextEvent.setDate(nextEvent.getDate()+24)
  return (
    <div className='stakes_container'>
      <h3>Stake</h3>
      {
        Loading ? <Loader /> : Error ? <Message text={Error} /> : <div>
          {
            stake?.map(el => {
              return (
                <div className='stakes_item'>
                  <p>Amount: {el.amount}</p>
                  <p>Rate :{el.rate}%</p>
                  <p>Duration(days) : {el.duration}</p>
                  <p>Daily ROI:{roi?.toFixed(2)}%</p>
                   {/* <ReactInterval timeout={5000} enabled={true}
                    callback={() => {
                      setRoi(parseFloat(roi) + parseFloat(el.rate * el.amount) / 100)
                      localStorage.setItem("rtns",roi)
                    }} /> */}
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