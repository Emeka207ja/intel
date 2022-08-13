import React,{useState,useEffect,useRef} from 'react'
import axios from "axios"
import Chart from './Chart'
import "./chart.css"
import TradingView from './TradingView'
const LiveChart = () => {
    const [pair, setPair] = useState("CVC-USD")
    const [currency, setCurrency] = useState()
    const [price, setPrice] = useState("0.00")
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState()
    const [priceHistory, setPriceHistory] = useState()
    const [date,setDate] = useState()
    const [time,setTime] = useState(60)
    const [TVpair,setTVpair] = useState("CVC")
    const ws = useRef(null)
    
    let first = useRef(false)
    
    useEffect(() => {
        ws.current = new WebSocket("wss://ws-feed.pro.coinbase.com")
        // console.log("soc", ws.current)

        const fetchCoins = async () => {
            try {
               let result = []
               const { data } = await axios.get("https://api.pro.coinbase.com/products")
            //   result = data
               let filtered = data.filter(pair => {
                   if (pair.quote_currency === "USD") {
                       return pair
                   }
               })
                filtered = filtered.sort((a, b) => {
                    if (a.base_currency < b.base_currency) {
                       return -1
                   }
                    if (a.base_currency > b.base_currency) {
                       return 1
                    }
                    return 0
                })
               
                setCurrency(filtered)
                first.current= true
           } catch (error) {
            console.log(error.response)
            }
            
        }
        fetchCoins()

        /////// function for fetching historical data for chart ////////
         const historicalData = async () => {
             try {
                let histArr =[]
                 const { data } = await axios.get(`https://api.pro.coinbase.com/products/${pair}`)
                 setTVpair(data.id)
                 console.log(data.id)
                 
                // let priceArray = data.map(val => { return val[4] })
                // const turned= priceArray.reverse()
                //  setPriceHistory(turned)
                 
                //  let dates = data.map(val => {
                //     const ts = val[0]
                //     let date = new Date(ts * 1000)
                //     let day = date.getDate()
                //     let month = date.getMonth() + 1
                //     let year = date.getFullYear()
                //      let final = `${month}-${day}-${year}`
                    
                //     return final
                //  })
                //  dates.reverse()
                //  setDate(dates)
                //   console.log(dates)
               ///candles?granularity=86400
            } catch (error) {
                console.log(error)
            }
        }
        historicalData()

        ////// Web Socket real time price fetching//////////
        if (!first.current) {
            console.log("returning on first render")
            return setLoading(true)
        }
        console.log("changing pair")
        // if (priceHistory) {
        //      console.log(priceHistory)
        // }
        let msg = {
            type: "subscribe",
            product_ids:[ pair],
            channels:["ticker"]
        }
        let jsonMsg = JSON.stringify(msg)

        
        ws.current.onopen = () => {
           ws.current.send(jsonMsg)
        }
         ws.current.onmessage = (e) => {
               setLoading(false)
                let data = JSON.parse(e.data)
                // console.log("data",data)
               
            //  setPrice(data.price)
            // if (data.type !== "ticker") {
            //     console.log("no ticker event", e)
            //     return
            // }
            if (data.product_id === pair) {
                // console.log("price",data?.price)
                setData(data)
                 setPrice(data.price)
                return 
               
                }
                 
        }
    }, [pair, time])
    console.log("TP",TVpair)

    // useEffect(() => {
    //     if (!first.current) {
    //         console.log("returning on first render")
    //         return
    //     }
    //     console.log("changing pair")
    //     let msg = {
    //         type: "subscribe",
    //         product_ids:[ pair],
    //         channels:["ticker"]
    //     }
    //     let jsonMsg = JSON.stringify(msg)

    //     console.log(pair)
    //     ws.current.onopen = () => {
    //        ws.current.send(jsonMsg)
    //     }
    //     const historicalData = async () => {
    //         try {
    //             const { data } = await axios.get(`https://api.pro.coinbase.com/products//${pair}/candles?granularity=86400`)
              
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    //     historicalData()
    //      ws.current.onmessage = (e) => {
               
    //             let data = JSON.parse(e.data)
    //             console.log("data",data)
               
    //         //  setPrice(data.price)
    //         if (data.type !== "ticker") {
    //             console.log("no ticker event", e)
    //             return
    //         }
    //         if (data.product_id === pair) {
    //             // console.log("price",data?.price)
    //             setPrice(data.price)
    //             }
                 
    //     }
    // }, [pair])
    // if(time){console.log("time",time)}

    const handlePairChange = (e) => {
        let unSuMsg = {
            type: "unsubscribe",
            product_ids: [pair],
            channels:["ticker"]
        }
        let unSub = JSON.stringify(unSuMsg)
         ws.current.send(unSub)
        // ws.current.onclose = () => {
        //     ws.current.send(unSub)
        // }
        setPair(e.target.value)
         
    }
    // if (priceHistory) {
    //     console.log(priceHistory)
    // }
  return (
    <div className='chart_container'>
          <h2>Live market</h2>
          <div className=''>
                <select value={pair} onChange={handlePairChange} className="mb-3 first_select">
                    {
                        currency?.map((el,index) => {
                            
                            return <option key={index} value={el.id}>{el.display_name }</option>
                        })
                    }
                    
              </select>
              <div>
                  
                    {/* <select value={time} onChange={(e)=>setTime(e.target.value)}>
                        <option value="60">1M</option>
                        <option value="300">5M</option>
                        <option value="900">15M</option>
                        <option value="3600">1Hr</option>
                        <option value="86400">1D</option>
                       
                    </select> */}
              </div>
              </div>
         
          {loading ? <h3 className='text-primary'>Select coin</h3> : data && <h3  className='text-primary'>{data.product_id} : ${data.price}   </h3>}
          {/* <Chart price={price} datas={priceHistory} Time={ date} /> */}
          <TradingView TPair={TVpair } />
         
    </div>
  )
}

export default LiveChart
