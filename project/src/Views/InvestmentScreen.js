import React from "react"

import { Container, Card, Row, ListGroup, ListGroupItem, Col } from "react-bootstrap"
import Investments from "../Components/Investments"

const InvestmentScreen = () => {
  return (
   
      <div className="investment_container">
        <Investments name="Starter" amount="1000" profit="333" duration="90"  power="2 313 GH/s"/>
        <Investments name="Economy" amount="5000" profit="1,665" duration="90" power="5 830 GH/s"/>
        <Investments name="Standard" amount="10,000" profit="3,333" duration="90" power="11 759 GH/s"/>
     </div>
  
  )
 }

export default InvestmentScreen