import React,{useState,useEffect,useRef} from 'react'

const MarqueeUsdt = () => {
    const [USDT, setUSDT] = useState()
    const ws = useRef(null)
    
    useEffect(() => {
        ws.current = new WebSocket("wss://ws-feed.pro.coinbase.com")
         let msgUSDT = {
            type: "subscribe",
            product_ids:["USDT-USD"],
            channels:["ticker"]
        }
        let jsonMsgUSDT = JSON.stringify(msgUSDT)

        ws.current.onopen = () => {
           ws.current.send(jsonMsgUSDT)
        }
       
        ws.current.onmessage = (e) => {

            let data = JSON.parse(e.data)
            setUSDT(data)
           
        }
    },[])
  return (
    <div>
       {
        USDT && <span className='text-dark px-3'>{USDT.product_id} : <span className={USDT.side==="buy"?"text-primary":"text-danger"}>{USDT.price }</span></span>
       }
    </div>
  )
}

export default MarqueeUsdt
