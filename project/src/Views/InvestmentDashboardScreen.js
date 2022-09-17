import React from 'react'
import { useParams } from "react-router-dom"
import { useSelector } from 'react-redux'
import { investmentFile } from '../Components/InvestmentFile'
import {Col,Row} from "react-bootstrap"
import {CopyToClipboard} from 'react-copy-to-clipboard';

const InvestmentDashboardScreen = () => {

    const params = useParams()
    const {userInfo} = useSelector(state=>state.investorSignup)
    const { id } = params 
    // 19WQrjzgyzc1QRPCVChnjmXTD5GGgnErQ8
    const selected = investmentFile?.find(el => el.id === id)
    console.log(selected)
  return (
      <div className='usdt_container'>
          <div className="investor_dashboard">
              <h3>Welcome {userInfo?.name}</h3>
              <Row>
                  <Col><h4>Email</h4></Col>
                  <Col><h4>{userInfo?.email}</h4></Col>
              </Row>
              <Row>
                  <Col><h4>Wallet</h4></Col>
                  <Col><h4>{userInfo?.wallet}</h4></Col>
              </Row>
         </div>
          <h3 className="heading_selected">investment option selected : {id} package</h3>
          <h5 className="heading_details">Details</h5>
          <div className="investment_card">
            <Row>
              <Col>
                <h2 className='heading_one'>{selected?.id} Package</h2>
              </Col>
          </Row>
          <hr></hr>
          <Row>
              <Col>
                <h3>Hashpower</h3>
              </Col>
              <Col>
            <h3>{selected?.hashpower }</h3>
              </Col>
          </Row>
          <Row>
              <Col>
                <h3>Duration of work</h3>
              </Col>
              <Col>
            <h3>{ selected?.duration} </h3>
              </Col>
          </Row>
          <Row>
              <Col>
                <h3>Monthly Profit</h3>
              </Col>
              <Col>
            <h3> {selected?.profit }</h3>
              </Col>
          </Row>
        <Row>
          <Col>
            <h3> Amount</h3>
          </Col>
          <Col>
            <h3> {selected?.amount }</h3>
          </Col>
        </Row>
        <Row>
            <Col><h3>Address</h3></Col>
            <Col>
                <CopyToClipboard text="19WQrjzgyzc1QRPCVChnjmXTD5GGgnErQ8">
                    <button className='copy_btn'>Copy Address</button>
                </CopyToClipboard>
            </Col>
        </Row>
        <Row>
            <Col><h3>Payment Instruction</h3></Col>
            <Col>
                <h3>to activate {selected?.id} package
                  copy this bitcoin address and pay in <span>{selected?.amount}</span> in bitcoin
                </h3>
            </Col>
        </Row>
          </div>
      </div>
  )
}

export default InvestmentDashboardScreen