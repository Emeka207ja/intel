import React from 'react'
import {Form,Col,Row,Button,Container,Image} from "react-bootstrap"

const Staking = () => {
  return (
      <Container >
          <h2>Intel wave staking</h2>
          <div className="staking_rate">
              <img src="/assets/inte.jpg" />
              <h3>Monthly Rate : 10%</h3>
          </div>
           <div className='intelPrice'>
          <img src='/assets/inte.jpg' alt='intel wave icon' />
          <p className='intel'>Intel Wave</p>
          <p> <span>$0.1102</span> <span>+0%</span>  </p>
    </div>
    </Container>
  )
}

export default Staking