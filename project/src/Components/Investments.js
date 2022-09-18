import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {Container,Card,Row,ListGroup,ListGroupItem,Col,Button} from "react-bootstrap"

const Investments = ({ name, amount, profit, duration, power,id,daily }) => {
  const navigate = useNavigate()
  const buyInvestment = () => {
    navigate(`/signin?redirect=${id}`)
  }
  return (
      <>
      <div  className="investment_card">
       
            <Row>
              <Col>
                <h2 className='heading_one'>{name} Pack</h2>
              </Col>
          </Row>
          <hr></hr>
          <Row>
              <Col>
                <h3>Hashpower</h3>
              </Col>
              <Col>
            <h3>{power }</h3>
              </Col>
          </Row>
          <Row>
              <Col>
                <h3>Duration of work</h3>
              </Col>
              <Col>
            <h3>{ duration} days</h3>
              </Col>
          </Row>
          <Row>
              <Col>
                <h3>Daily Profit</h3>
              </Col>
              <Col>
            <h3>$ {daily }</h3>
              </Col>
          </Row>
          <Row>
              <Col>
                <h3>Three (3) days Profit</h3>
              </Col>
              <Col>
            <h3>$ {profit }</h3>
              </Col>
          </Row>
        <Row>
          <Col>
            <h3>$ {amount }</h3>
          </Col>
          <Col>
           <button onClick={buyInvestment} className="butt">Buy Now</button>
          </Col>
        </Row>
      </div>
      </>
  )
}

export default Investments