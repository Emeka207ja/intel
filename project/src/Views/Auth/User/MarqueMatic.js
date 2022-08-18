import React,{useEffect,useState,useRef} from 'react'

const MarqueMatic = () => {
    const [MATIC, setMATIC] = useState()
    const ws = useRef(null)
    
    useEffect(() => {
        ws.current = new WebSocket("wss://ws-feed.pro.coinbase.com")
         let msgMATIC = {
            type: "subscribe",
            product_ids:["MATIC-USD"],
            channels:["ticker"]
        }
        let jsonMsgMATIC = JSON.stringify(msgMATIC)

        ws.current.onopen = () => {
           ws.current.send(jsonMsgMATIC)
        }
       
        ws.current.onmessage = (e) => {

            let data = JSON.parse(e.data)
            setMATIC(data)
           
        }
    },[])
  return (
    <div>
       {
              MATIC && <span className='text-dark px-3'>{MATIC.product_id} : <span className={MATIC.side==="buy"?"text-primary":"text-danger"}>{MATIC.price }</span></span>
          }
    </div>
  )
}

export default MarqueMatic
