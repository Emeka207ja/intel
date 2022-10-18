import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from "react-redux"
import { fetchPriceAction } from '../Actions/PriceAction'
const IntelPrice = () => {
const [Price,setPrice] = useState(0)
 const dispatch = useDispatch()
  const {price} = useSelector(state=>state.fetchPrice)
    
  
 
  useEffect(() => {  
    dispatch(fetchPriceAction())
    }, [dispatch])
 
  return (
      <div className='intelPrice'>
          <img src='/assets/inte.jpg' alt='intel wave icon' />
          <p className='intel'>Intel Wave</p>
      <p className={price&&price[0].tick ==="down"? "priceSpan2":"priceSpan"}> <span >$ {price&&price[0].intelPrice}</span> <span>+{price&&price[0].rate}%</span>  </p>
    </div>
  )
}

export default IntelPrice