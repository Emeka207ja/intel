import React,{useEffect,useState,useRef} from 'react'

const MarqueEth = () => {
    const [ETH, setETH] = useState()
    const ws = useRef(null)
    
    useEffect(() => {
        ws.current = new WebSocket("wss://ws-feed.pro.coinbase.com")
         let msgETH = {
            type: "subscribe",
            product_ids:["ETH-USD"],
            channels:["ticker"]
        }
        let jsonMsgETH = JSON.stringify(msgETH)

        ws.current.onopen = () => {
           ws.current.send(jsonMsgETH)
        }
       
        ws.current.onmessage = (e) => {

            let data = JSON.parse(e.data)
            setETH(data)
           
        }
    },[])
    
  return (
    <div>
      {
              ETH && <span className='text-dark'>{ETH.product_id} :<span className={ETH.side==="buy"?"text-primary":"text-danger"}>{ETH.price }</span></span>
          }
    </div>
  )
}

export default MarqueEth
