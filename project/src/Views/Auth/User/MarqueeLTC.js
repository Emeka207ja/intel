import React,{useEffect,useState,useRef} from 'react'

const MarqueeLTC = () => {
     const [LTC, setLTC] = useState()
    const ws = useRef(null)
    
    useEffect(() => {
        ws.current = new WebSocket("wss://ws-feed.pro.coinbase.com")
         let msgLTC = {
            type: "subscribe",
            product_ids:["LTC-USD"],
            channels:["ticker"]
        }
        let jsonMsgLTC = JSON.stringify(msgLTC)

        ws.current.onopen = () => {
           ws.current.send(jsonMsgLTC)
        }
       
        ws.current.onmessage = (e) => {

            let data = JSON.parse(e.data)
            setLTC(data)
           
        }
    },[])
  return (
    <div>
      {
        LTC && <span className='text-dark px-3'>{LTC.product_id} : <span className={LTC.side==="buy"?"text-primary":"text-danger"}>{LTC.price }</span></span>
     }
    </div>
  )
}

export default MarqueeLTC
