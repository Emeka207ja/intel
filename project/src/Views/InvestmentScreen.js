import React from "react"

import { Container, Card, Row, ListGroup, ListGroupItem, Col } from "react-bootstrap"
import Investments from "../Components/Investments"

const InvestmentScreen = () => {
  return (
   
    <div className="investment_container">
      <Investments name="Starter" amount="1000" profit="1,999" duration="3" power="2 313 GH/s" id="starter" daily="333" />
      <Investments name="Economy" amount="5000" profit="9,995" duration="3" power="5 830 GH/s" id="economy" daily="1,665" />
      <Investments name="Standard" amount="10,000" profit="19,999" duration="3" power="11 759 GH/s" id="standard" daily="3,333"/>
    </div>
  
  )
 }

export default InvestmentScreen