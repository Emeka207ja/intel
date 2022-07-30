import React from 'react'
import { useEffect,useRef,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'
import useView from './useView'
import { Link } from 'react-router-dom'
import {useInView} from 'react-intersection-observer'
import { useAnimation, motion } from 'framer-motion'
import { useOnscreen } from './useView'

import int from './Img/shopIntel.jpg'
import Copy from './Copy'

const Home = () => {
    const { ref: myRef, inView, entry } = useInView({ rootMargin: "-10px" })
    const { ref:secRef, inView:visib, entry:enter } = useInView({ rootMargin: "-10px" })
    const { ref:thirdRef, inView:show, entry:entered } = useInView({ rootMargin: "-10px" })
    const { ref:fourthRef, inView:showy, entry:ent } = useInView({ rootMargin: "-10px" })
    const { ref:fifthRef, inView:showed, entry:en } = useInView({ rootMargin: "-10px" })
    const navigate = useNavigate()

    //navigate to whatsapp link
    const ChatAdmin = () => {
        navigate("https://wa.me/+2348029220463")
    }
    const [ref, visible] = useView({ rootMargin: "-10px" })
    // const [refVal,view] = useOnscreen({rootMargin:"-10px"})
  return (
    <div className='container-fluid home' style={{
         
         
      }
      }>
          <section> 
              <div className='hero py-3 '>
                  <div className='heroImage rounded-3'>
                      <img src={`${int}` } width='100%' height='300px'/>
                  </div>
                  <div className='heroPara'>
                      <h2>Emerging </h2>
                      <h2>Disruptive</h2>
                      <h6>Online Decentralized Finance</h6>
                  </div>
              </div>
              
          </section>
          <section className=' white-paper rounded container-fluid intelWave'>
              <div className=' text-white  '>
              
                  <div>
                      <h1 className='text-center mt-2'>INTEL WAVE </h1>
                       <p className=' '>
                          Intel wave is a line of streamlined midrange consumer, workstation and enthusiast computer central processing units (CPUs) marketed by Intel Corporation.  
                      </p>
                      <p>These processors displaced the existing mid- to high-end Pentium processors at the time of their introduction, moving the Pentium to the entry level </p>

                        <h4> What is the benefit of Intel wave</h4>
                        <span> Benefits or advantages of Intel wave Processor speed is </span>
                        <li>
                            very fast due to combination of turbo boost and hyper threading technologies. ➨It consists of 4 pin connector to control the speed of fan
                        </li>
                        <li>
                            It provides cooler running technology for less heat and less noise. ➨It can be run at over clocking speedWhat are Intel wave used for?
                        </li>
                        
                    </div>
               </div>
          </section>

          <section ref={myRef} className={`${inView? "intelWaveBottom":"visibility"}`} >
              
              <div  className=' white-paper rounded text-white mt-3 container-fluid protocol'>
                   
                  <h1 className='text-center protocol__head'>INTEL WAVE PROTOCOL WHITE PAPER </h1>
                  <div className='protocol__part1'>
                       <p>
                          A common misconception with the heavy APY average is the subjectivity of the impermanent loss from staking an LP (liquidity provider) in a farming reward generator. With the explosion of DeFi we have seen too many new cryptocurrency prospectors get sucked into a high APY LP-farming trap, feeling hopeless as they are pushed out by earlier buyers with higher staking rewards. We have all been there, seeing those shiny  digit figures can be pretty damn tempting to jump in.

                      </p>
                      <p>
                          Moreover,  always the token suffers from the inevitable valuation bubble, which is then followed by the burst and the impending collapse of the price. This is why we have seen the mass adoption of none reflecting token, also known as coins, a separate concept that seeks to eliminate the troubles caused by farming rewards.
                      </p>
                  </div>
                      {/* <h4>Benefits of holding, LP Acquisition, Manual Burn</h4> */}
                     
                  <div className='protocol__part2'>
                      <h4>Why intel wave</h4>
                      <p>
                          intel wave solves a host of problems. First, the reward of holding is conditional upon the volume of the token being traded. This mechanism aims to alleviate some of the downward sell pressure put on the token caused by earlier adopters selling their tokens after farming crazy high APY’s. Secondly, intel wave mechanism encourages holders to hang onto their tokens to gain upper hands which are based upon a percentages carried out and dependant upon the total tokens held by the owner.With just a total supply of five billion coins  deployed by the dev's this intends to be by far a great and major concerns of buyers and holders because the more sell the more lower in quality and the more expensive each token will be. Stakers can choose to stake on LP farming and gain 0.7 of every transaction made in the token sales.Due to low amount of supply there will be no manual burn
                      </p>
                    </div>
                   
              </div>
          </section>
          <section ref={ref} className={`${visible? "intelWaveBottom":"visibility"}`}>
             
              <div className=' white-paper rounded text-white mt-3 container-fluid'
              >
                  <div >
                  
                        <h2 className='text-center'>FREQUENTLY ASKED QUESTIONS</h2>
                        <p className='  '>
                           Intel wave will be used by many companies as a form of payment,Intel wave is a precious gem a coin meant for the people <br />
                       </p>

                       <h4> What is proof of legitimacy on Intel wave and why should you invest your money on intel coin?</h4>
                      
                       <p>
                            .. you should invest in Intel wave because the power protocol which Intel wave uses to process payments is very cheaper than many known crypto currencies in the world today, which will makes it adoptable to many companies and exchanges.
                      </p>

                       <h4>Should you trust trust Intel wave?</h4>
                       <p>
                            ..yes because intel has been verified by bscscan.com and own a contract label and also Intel wave is not a reflection token which may lose values in the crypto space. secondly our team who are crypto guru's, blockchain developers and technical experts all around the world has been on the work to make sure we're up and going
                       </p>


                        <h4> Why should you stake your Intel wave?</h4>
                        <p>
                            you should stake your Intel wave because the more liquidity Intel wave has the faster it's payment process is and therefore you're earning percentage from the transaction fees.
                                can i unstake anytime i want and will i lose my bnb and Intel wave ??
                                yes you will unstake anytime you want and you will not lose any bnb or Intel coin instead your profits will be added to your bnb
                        </p>
                       
                    </div>
              </div>
          </section>
          <section ref={secRef} className={`${visib? "intelWaveBottom":"visibility"}`}>
              <div className='container-fluid text-white  white-paper mt-3'>
                    <h2>Project Road-Map</h2>
                    <ul>
                        <li>Coin creation</li>
                        <li>Launched on pancakes swap</li>
                        <li>Coin promotion</li>
                        <li>Website launch and adding logo</li>
                        <li>Listing on coinmarketcap and coin gecko</li>
                        <li>Building an E commerce site where intelwave will be used as a form of payment.</li>
                        <li>Building intelwave first game where u earn intel while playing games.</li>
                        <li>Building a less privileged home where contributions will be made to help the less privileges</li>
                  </ul>
              </div>
          </section>
          <section ref={thirdRef} className={`${show? "intelWaveBottom mt-2":"visibility"}`}> 
                  <div >
                  
                      <div className='tot container-fluid text-center text-white'>
                          <h6>Total supply</h6>
                          <div className='dec text-center'>=</div>
                          <p>5,000,000,000</p>
                          <h6>Decimal</h6>
                          <div  className='dec text-center'>=</div>
                          <p>18</p>
                          <h6>name</h6>
                          <div className='dec text-center'>=</div>
                          <h6>"INTEL WAVE"</h6>
                          <h6>symbol</h6>
                          <div  className='dec text-center'>=</div>
                          <h6>INTEL</h6>
                          <h6>address</h6>
                          <div  className='dec text-center'>=</div>
                          <p>0x1279A923012fcd7cEADcE7e4d54E9D4A19251E91</p>
                          
                      </div>
                      
                   </div>
              
          </section>
          <section ref={fourthRef} className={`${showy? "intelWaveBottom":"visibility"}`}> 
              <div  className=' white-paper rounded text-white mt-3 container-fluid'> 
                 
                  <div  className='text-center'>
                   
                      <h2 className='text-center'>INTELWAVE PRESALE</h2>
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
                      </h6>
                      <p>copy the bnb wallet address above and click on the whatsap icon to chat admin for presale order</p>
                          <a href="https://wa.me/+2348029220463" className='btn '>
                              <img src="https://img.icons8.com/color/48/undefined/whatsapp--v1.png" alt='whatsap'/>
                          </a >
                      
                    </div>
              </div>
          </section>

          
          
         
          <section  ref={fifthRef} className={`${showed? "intelWaveBottom":"visibility"}`}>
              <div className=' container-fluid border-3 social mt-2 rounded-3 white-paper'>
                  <h2 className='text-white text-center py-3'>Join our social community</h2>
                  <div className='d-flex justify-content-around align-content-center'>
                      <motion.a href='https://m.facebook.com/INTEL-WAVE-101191582637019/
'
                          whileHover={{
                              backgroundColor: '#b0b0ae',
                               borderRadius:20,
                              scale:1.1
                          }}
                      >
                           <img src="https://img.icons8.com/color/48/undefined/facebook-new.png" alt='facebook'/>
                      </motion.a>

                      <motion.a href='https://twitter.com/intelwave1?t=LjI0UWpyITofMJu3-9QikQ&s=09'
                           whileHover={{
                               backgroundColor: '#b0b0ae',
                                borderRadius:20,
                              scale:1.1
                          }}
                      >
                          <img src="https://img.icons8.com/color/48/undefined/twitter--v1.png" alt='twitter'/>
                      </motion.a>
                      <motion.a href='https://t.me/+5-u0ywve8lQzMWI0'
                           whileHover={{
                               backgroundColor: '#b0b0ae',
                                borderRadius:20,
                              scale:1.1
                          }}
                      >
                          <img src="https://img.icons8.com/color/48/undefined/telegram-app--v1.png" alt='telegram'/>
                      </motion.a>
                     
                     
                  </div>
                  <p className='text-white text-center mt-4'>&copy; INTEL WAVE DEFI</p>
              </div>
          </section>
    </div>
  )
}

export default Home