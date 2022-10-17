import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch,useSelector } from 'react-redux'
import { Container, Form, Button,FormGroup,FormControl,FormLabel } from 'react-bootstrap'
import { updatePriceAction, fetchPriceAction } from '../Actions/PriceAction'
import Loader from "../Components/Loader"
import Message from "../Components/Message"
const UpdatePriceScreen = () => {
   
    const [usdtPrice1, setUsdtPrice1] = useState()
    const [usdtPrice2, setUsdtPrice2] = useState(610)
    const [intelPrice, setIntelPrice] = useState(0.1109)
    const [rate, setRate] = useState(0)

     const { price } = useSelector(state => state.fetchPrice)
     const { userInfo } = useSelector(state => state.login)
    const dispatch = useDispatch()
    const { loading, errorMsg, successMsg } = useSelector(state => state.updatePrice)

    useEffect(() => {
        dispatch(fetchPriceAction())
        fetchPrice()
    }, [dispatch])


    const id = price && price[0]._id
    
    const updatePriceHandler = (e) => {
        e.preventDefault()
        dispatch(updatePriceAction(usdtPrice1, usdtPrice2, intelPrice, rate, id))
        
    }
    const fetchPrice = async () => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${userInfo?.token}`
                }
            }
            const { data } = await axios.get("/api/price/allprice", config)
            setIntelPrice(data && data[0].intelPrice)
            setUsdtPrice1(data&&data[0].usdtPrice1)
            setUsdtPrice2(data&&data[0].usdtPrice2)
            setRate(data&&data[0].rate)
            
        } catch (error) {
           console.log(error)
        }
    }
  return (
      <Container className="mt-2">
          {
              loading ? <Loader /> : successMsg ? <Message text={successMsg} /> : errorMsg ? <Message text={ errorMsg} variant="danger" />:" "
          }
          <form onSubmit={updatePriceHandler} className="mt-2">
              <FormGroup>
                  <FormLabel>Price of 100Usdt-400Usdt</FormLabel>
                  <FormControl value={ usdtPrice1} onChange={(e)=>setUsdtPrice1(e.target.value)} />
              </FormGroup>
              <FormGroup>
                  <FormLabel>Price of 500Usdt-1000Usdt</FormLabel>
                  <FormControl value={ usdtPrice2} onChange={(e)=>setUsdtPrice2(e.target.value)}/>
              </FormGroup>
              <FormGroup>
                  <FormLabel>Intel Wave Price</FormLabel>
                  <FormControl value={ intelPrice} onChange={(e)=>setIntelPrice(e.target.value)} />
              </FormGroup>
              <FormGroup>
                  <FormLabel>Percentage Increase</FormLabel>
                  <FormControl value={ rate} onChange={(e)=>setRate(e.target.value)} />
              </FormGroup>
              <Button className="mt-2" type="submit">Update</Button>
          </form>
          {/* <form  onSubmit={updatePriceHandler}>
              <button>submit</button>
          </form> */}
   </Container>
  )
}

export default UpdatePriceScreen