import React,{useState,useEffect,useRef} from 'react'

const Marques = () => {
    const ws = useRef(null)
    const [BTC,setBTC] = useState()
    // const [ETH,setETH] = useState()

    useEffect(() => {
         ws.current = new WebSocket("wss://ws-feed.pro.coinbase.com")
         let msg = {
            type: "subscribe",
            product_ids:["BTC-USD"],
            channels:["ticker"]
        }
        let jsonMsg = JSON.stringify(msg)
//"ETH-USD","USDT-USD","BUSD-USD","LTC-USD","MATIC-USD"
        //  ws.current.send(jsonMsg)
        ws.current.onopen = () => {
           ws.current.send(jsonMsg)
        }
        
        ws.current.onmessage = (e) => {

            let data = JSON.parse(e.data)
            setBTC(data)
            
        }
       
    },[])
  return (
      <div>
          {
              BTC && <span className='text-dark px-3'>{BTC.product_id} : <span className={BTC.side==="buy"?"text-primary":"text-danger"}>{BTC.price }</span></span>
          }
      {/* <h3>Marques</h3> */}
    </div>
  )
}

export default Marques
