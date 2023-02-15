import react, { useEffect,useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import logo from './Img/int.jpg'
import './Welcome.css'
const Welcome = () => { 
    const [quotes, setQuotes] = useState()
    const [quoteVal,setQuoteVal] = useState()
    const navigate = useNavigate()
    const MoveAway = () => {
        navigate('/home')
    }
    // const fetchQuotes = async() => {
    //    try {
    //      const { data } = await axios.get("/v1/cryptocurrency/listings/latest", {
    //         headers: {
    //              "X-CMC_PRO_API_KEY": "444ddebc-9f0a-4a91-bd0f-6c678cd0ad96",
    //             "content-type": "application/json",
    //             "accept": "application/json",
    //             'Access-Control-Allow-Origin':'*'
                
    //          }
            
    //      })
    //     setQuotes(data)
       
    //    } catch (error) {
    //     console.log(error)
    //    }
        
    // }
    // useEffect(() => {
    //     fetchQuotes()
    // }, [])
    if (quotes) {
        const { data } = quotes;
        console.log( quotes.data)
    }

    
    return (
        <div className='Home'>
            {/* <marquee width = "50%" className='text-white d-inline' >
                {
                    <p>
                        <span className='text-primary'>{quotes && quotes.data[0].symbol}</span>:<span className='text-danger px-2'>{quotes && quotes.data[0].quote.USD.price}</span>
                        <span className='text-primary'>{quotes && quotes.data[1].symbol}</span>:<span className='text-danger px-2'>{ quotes&& quotes.data[1].quote.USD.price}</span>
                        <span className='text-primary'>{quotes && quotes.data[2].symbol}</span>:<span className='text-danger px-2'>{ quotes&& quotes.data[2].quote.USD.price}</span>
                        <span className='text-primary'>{quotes && quotes.data[3].symbol}</span>:<span className='text-danger px-2'>{ quotes&& quotes.data[3].quote.USD.price}</span>
                        <span className='text-primary'>{quotes && quotes.data[4].symbol}</span>:<span className='text-danger px-2'>{ quotes&& quotes.data[4].quote.USD.price}</span>
                        <span className='text-primary'>{quotes && quotes.data[5].symbol}</span>:<span className='text-danger px-2'>{ quotes&& quotes.data[5].quote.USD.price}</span>
                        <span className='text-primary'>{quotes && quotes.data[6].symbol}</span>:<span className='text-danger px-2'>{ quotes&& quotes.data[6].quote.USD.price}</span>
                        <span className='text-primary'>{quotes && quotes.data[7].symbol}</span>:<span className='text-danger px-2'>{ quotes&& quotes.data[7].quote.USD.price}</span>
                        <span className='text-primary'>{quotes && quotes.data[8].symbol}</span>:<span className='text-danger px-2'>{ quotes&& quotes.data[8].quote.USD.price}</span>
                        <span className='text-primary'>{quotes && quotes.data[9].symbol}</span>:<span className='text-danger px-2'>{ quotes&& quotes.data[9].quote.USD.price}</span>
                    </p>
                   
                    
               }
            </marquee> */}
           {/* {quotes&& quotes.data.map(el=>{
               return (
                   <marquee width = "50%" loop="2" className='text-white'>
                       {el.symbol}:{el.quote.USD.price }
                   </marquee>)
           })} */}
            <div className='Intel'>
                <h2>
                <span className='wave'>INTEL WAVE</span>
               
                </h2>
                <h2>
                     <span className='disrupt'>Decentralized Finance</span>
                </h2>
                <p className='para'>changing the blockchain finance narative</p>
                {/* <button className='btn btn-primary btnAnime' onClick={MoveAway}>learn more</button> */}
            </div>
        </div>
    )
}
export default Welcome