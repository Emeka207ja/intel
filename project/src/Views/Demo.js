import react, { useState } from 'react'
import { Link } from 'react-router-dom'
import Marquee from "react-fast-marquee";
import MarqueeLTC from './Auth/User/MarqueeLTC'
import MarqueEth from './Auth/User/MarqueEth'
import MarqueeUsdt from './Auth/User/MarqueeUsdt'
import MarqueMatic from './Auth/User/MarqueMatic'
import Marques from './Auth/User/Marques'
import './demo.css'
const Demo = () => {
    const [show1,setShow1] = useState(false)
    const [show2,setShow2] = useState(false)
    const [show3, setShow3] = useState(false)
    const [show4, setShow4] = useState(false)
    const [readMore, setReadMore] = useState(false)
    const [readMore2, setReadMore2] = useState(false)
    const [roadMap, setRoadMap] = useState(false)

    return (
        <div>
             {/* <Marquee className='react_marquee' speed={50} >
                  <MarqueeLTC />
                  <Marques />
                  <MarqueEth />
                   <MarqueeUsdt />
                   <MarqueMatic/>
              </Marquee> */}
        <div className='home__container'>
            <section className='hero__head'>
                <div className=''>
                      <h2>Emerging </h2>
                      <h2>Disruptive</h2>
                      <h6>Online Decentralized Finance</h6>
                  </div>
            </section>
            <section className='hero__intro'>
                 <div>
                      <h1 className='text-center mt-2'>INTEL WAVE </h1>
                       <p className=' '>
                        Intel wave is a line of streamlined midrange consumer, workstation and enthusiast computer central processing units (CPUs) marketed by Intel Corporation. <br/>  
                        These processors displaced the existing mid- to high-end Pentium processors at the time of their introduction, moving the Pentium to the entry level
                      </p>
                     

                    </div>
            </section>
            <section className='white__paper'>
                <h1 className=''>INTEL WAVE PROTOCOL WHITE PAPER </h1>
                  <div className=''>
                       <p>
                        A common misconception with the heavy APY average is the subjectivity of the impermanent loss from staking an LP (liquidity provider) in a farming reward generator. With the explosion of DeFi we have seen too many new cryptocurrency prospectors get sucked into a high APY LP-farming trap,
                        {readMore && <span> feeling hopeless as they are pushed out by earlier buyers with higher staking rewards. We have all been there, seeing those shiny  digit figures can be pretty damn tempting to jump in. <br />
                            Moreover,always the token suffers from the inevitable valuation bubble, which is then followed by the burst and the impending collapse of the price. This is why we have seen the mass adoption of none reflecting token, also known as coins, a separate concept that seeks to eliminate the troubles caused by farming rewards</span>}.
                        {!readMore? <span onClick={()=>{setReadMore(prev=>!prev)}} className='showMore'>...READ MORE</span>:<span className='showMore' onClick={()=>{setReadMore(prev=>!prev)}}>...READ LESS</span>}

                      </p>
                     
                  </div>
                      {/* <h4>Benefits of holding, LP Acquisition, Manual Burn</h4> */}
                     
                  <div className=''>
                    <h4>Why intel wave</h4>
                      <p>
                        intel wave solves a host of problems. First, the reward of holding is conditional upon the volume of the token being traded. This mechanism aims to alleviate some of the downward sell pressure put on the token caused by earlier adopters selling their tokens after farming crazy high APY’s.{readMore2 && <span> Secondly, intel wave mechanism encourages holders to hang onto their tokens to gain upper hands which are based upon a percentages carried out and dependant upon the total tokens held by the owner.With just a total supply of five billion coins  deployed by the dev's this intends to be by far a great and major concerns of buyers and holders because the more sell the more lower in quality and the more expensive each token will be. Stakers can choose to stake on LP farming and gain 0.7 of every transaction made in the token sales.Due to low amount of supply there will be no manual burn</span>}
                        {!readMore2?<span onClick={()=>{setReadMore2(prev=>!prev)}} className='showMore'>...READ MORE</span>:<span onClick={()=>{setReadMore2(prev=>!prev)}} className='showMore'>...READ LESS</span>}
                      </p>
                    </div>
            </section>
            <section className='faq'>
                <div>
                    <h3>FREQUENTLY ASKED QUESTIONS</h3>
                    <h4> What is the benefit of Intel wave</h4>
                    {show4 &&
                        <p>
                            very fast due to combination of turbo boost and hyper threading technologies. ➨It consists of 4 pin connector to control the speed of fan
                            It provides cooler running technology for less heat and less noise. ➨It can be run at over clocking speedWhat are Intel wave used for?
                        </p>
                    }
                    {!show4 ? <span className='showMore'  onClick={() => setShow4(prev => !prev)}>Read</span> : <span className='showMore' onClick={() => setShow4(prev => !prev)}>Close</span>}
                    
                    <h4 > What is proof of legitimacy on Intel wave and why should you invest your money on intel coin?  </h4>
                   
                    {show1&&
                        <p>
                            .. you should invest in Intel wave because the power protocol which Intel wave uses to process payments is very cheaper than many known crypto currencies in the world today, which will makes it adoptable to many companies and exchanges.
                      </p>
                    }
                    {!show1 ? <span className='showMore' onClick={() => setShow1(prev => !prev)}>Read</span> : <span className='showMore' onClick={() => setShow1(prev => !prev)}>Close</span>}
                    
                    <h4>Should you trust trust Intel wave?</h4>
                    
                    {show2&&<p>
                            ..yes because intel has been verified by bscscan.com and own a contract label and also Intel wave is not a reflection token which may lose values in the crypto space. secondly our team who are crypto guru's, blockchain developers and technical experts all around the world has been on the work to make sure we're up and going
                    </p>}
                    {!show2 ? <span className='showMore' onClick={() => setShow2(prev => !prev)}>Read</span> : <span className='showMore' onClick={() => setShow2(prev => !prev)}>Close</span>}
                    
                    <h4 > Why should you stake your Intel wave? </h4>
                        
                   
                    {show3&&<p>
                            ..you should stake your Intel wave because the more liquidity Intel wave has the faster it's payment process is and therefore you're earning percentage from the transaction fees.
                                can i unstake anytime i want and will i lose my bnb and Intel wave ??
                                yes you will unstake anytime you want and you will not lose any bnb or Intel coin instead your profits will be added to your bnb
                    </p>}
                    {!show3?<span className='showMore'onClick={() => setShow3(prev => !prev)}>Read</span>:<span className='showMore'onClick={() => setShow3(prev => !prev)}>Close</span>}
                </div>
            </section>
            <section className='road__map'>
                <h2>Project Road-Map</h2>
                <p>➨phase 1 <span>Coin creation</span></p>
                <p>➨phase 2 <span>Launched on pancakes swap</span></p>
                <p>➨phase 3 <span>Coin promotion</span></p>
               {roadMap&& <> <p>➨phase 4 <span>Website launch and adding logo</span></p>
                <p>➨phase 5 <span>Listing on coinmarketcap and coin gecko</span></p>
                <p>➨phase 6 <span>Building an E commerce site where intelwave will be used as a form of payment.</span></p>
                <p>➨phase 7 <span>Building intelwave first game where u earn intel while playing games.</span>1</p>
                <p>➨phase 8 <span>Building a less privileged home where contributions will be made to help the less privileges</span></p></>}
               {!roadMap?<span onClick={()=>setRoadMap(prev=>!prev)}>Read all</span>:<span  onClick={()=>setRoadMap(prev=>!prev)}>Read Less</span>}
            </section>
            <section className='coin__value'>
                <div className='text-center'>
                          <h6>Total supply</h6>
                          <div className=''>=</div>
                          <p>5,000,000,000</p>
                          <h6>Decimal</h6>
                          <div  className=''>=</div>
                          <p>18</p>
                          <h6>name</h6>
                          <div className=''>=</div>
                          <h6>"INTEL WAVE"</h6>
                          <h6>symbol</h6>
                          <div  className=''>=</div>
                          <h6>INTEL</h6>
                          <h6>address</h6>
                          <div  className=''>=</div>
                          <p>0x1279A923012fcd7cEADcE7e4d54E9D4A19251E91</p>
                          
                      </div>
                      
            </section>
            <section className='presale__info'>
                 <h2 className=''>INTELWAVE PRESALE</h2>
                       <h6>5000 intel= 27 USDT
                        </h6>
                        <h6>
                            10,000 Intel = 55 USDT
                        </h6>
                        <h6>
                            20,000 Intel = 100 USDT
                        </h6>
                        <h6>
                            40,000 Intel = 200 USDT
                        </h6>
                        <h6> 
                                60,000 Intel = 330 USDT
                        </h6>
                        <h6>
                                102,000 Intel = 500 USD
                                
                        </h6>
                        <h6>
                                204,000 Intel = 1000 USDT
                      </h6>
                <h6>you are eligible to buy with BNB smartchain with the equivalent amount in USDT
                   <p> <Link to ='/register'>Purchase IntelWave</Link></p>
                      </h6>
            </section>
            <section className='footer'>
                <div className='footer__socials'>
                    <Link to='https://twitter.com/intelwave1?t=LjI0UWpyITofMJu3-9QikQ&s=09'>
                        <img src="https://img.icons8.com/color/48/undefined/facebook-new.png" alt='facebook'/>
                    </Link>
                    <Link to='https://twitter.com/intelwave1?t=LjI0UWpyITofMJu3-9QikQ&s=09'>
                        <img src="https://img.icons8.com/color/48/undefined/twitter--v1.png" alt='twitter'/>
                    </Link>
                    <Link to='https://t.me/+5-u0ywve8lQzMWI0'>
                        <img src="https://img.icons8.com/color/48/undefined/telegram-app--v1.png" alt='telegram'/>
                    </Link>
                    
                </div>
                <p className='text-white text-center mt-4'>&copy; INTEL WAVE </p>
            </section>
            </div>
        </div>
     )
}
 
export default Demo