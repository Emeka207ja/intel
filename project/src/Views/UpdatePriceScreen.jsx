import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch,useSelector } from 'react-redux'
import { Container, Form, Button,FormGroup,FormControl,FormLabel,FormSelect } from 'react-bootstrap'
import { updatePriceAction, fetchPriceAction } from '../Actions/PriceAction'
import Loader from "../Components/Loader"
import Message from "../Components/Message"
const UpdatePriceScreen = () => {
   
    const [usdtPrice1, setUsdtPrice1] = useState()
    const [usdtPrice2, setUsdtPrice2] = useState(610)
    const [intelPrice, setIntelPrice] = useState(0.1109)
    const [max1Usdt, setMax1Usdt] = useState(400)
    const [min1Usdt, setMin1Usdt] = useState(100)
    const [max2Usdt, setMax2Usdt] = useState(1000)
    const [min2Usdt, setMin2Usdt] = useState(500)
    const [rate, setRate] = useState(0)
    const [tick, setTick] = useState("up")

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
        console.log(usdtPrice1, usdtPrice2, intelPrice, rate,tick, id)
        dispatch(updatePriceAction(usdtPrice1,
            usdtPrice2, intelPrice,
            rate, tick, id,
            max1Usdt,min1Usdt,max2Usdt,min2Usdt
        ))
        
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
            setTick(data&&data[0].tick)
            setMax1Usdt(data&&data[0].max1Usdt)
            setMin1Usdt(data&&data[0].min1Usdt)
            setMax2Usdt(data&&data[0].max2Usdt)
            setMin2Usdt(data&&data[0].min2Usdt)
            
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
                  <FormLabel className='text-white'> Min : {min1Usdt} usdt </FormLabel>
                  <FormControl value={ min1Usdt} onChange={(e)=>setMin1Usdt(e.target.value)} />
              </FormGroup>
              <FormGroup>
                  <FormLabel className='text-white'> Max : {max1Usdt} usdt </FormLabel>
                  <FormControl value={max1Usdt} onChange={(e)=>setMax1Usdt(e.target.value)} />
              </FormGroup>
              <FormGroup>
                  <FormLabel className='text-white'> Min : {min2Usdt} usdt </FormLabel>
                  <FormControl value={ min2Usdt} onChange={(e)=>setMin2Usdt(e.target.value)} />
              </FormGroup>
              <FormGroup>
                  <FormLabel className='text-white'> Max : {max2Usdt} usdt </FormLabel>
                  <FormControl value={max2Usdt} onChange={(e)=>setMax2Usdt(e.target.value)} />
              </FormGroup>
              
              
             
              <FormGroup>
                  <FormLabel className='text-white'>Price of {min1Usdt} usdt - {max1Usdt} usdt</FormLabel>
                  <FormControl value={ usdtPrice1} onChange={(e)=>setUsdtPrice1(e.target.value)} />
              </FormGroup>
              <FormGroup>
                  <FormLabel className='text-white'>Price of {min2Usdt} usdt - {max2Usdt} usdt</FormLabel>
                  <FormControl value={ usdtPrice2} onChange={(e)=>setUsdtPrice2(e.target.value)}/>¬
              </FormGroup>
              <FormGroup>
                  <FormLabel className='text-white'>Intel Wave Price</FormLabel>
                  <FormControl value={ intelPrice} onChange={(e)=>setIntelPrice(e.target.value)} />
              </FormGroup>
              <FormGroup>
                  <FormLabel className='text-white'>Percentage Increase</FormLabel>
                  <FormControl value={ rate} onChange={(e)=>setRate(e.target.value)} />
              </FormGroup>
              <FormGroup>
                    <FormLabel className='text-white'>Select Tick</FormLabel>
                    <FormSelect aria-label='Tick' value={tick} onChange={(e)=>setTick(e.target.value)}>
                        <option value="up">up</option>
                        <option value="down">down</option>
                    </FormSelect>
             </FormGroup>
              <Button className="mt-2 text-white" type="submit">Update</Button>
          </form>
          {/* <form  onSubmit={updatePriceHandler}>
              <button>submit</button>
          </form> */}
   </Container>
  )
}

export default UpdatePriceScreen