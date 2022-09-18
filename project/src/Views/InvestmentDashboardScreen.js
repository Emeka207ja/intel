import React,{useState,useEffect} from 'react'
import { useParams } from "react-router-dom"
import { useSelector,useDispatch } from 'react-redux'
import { investmentFile } from '../Components/InvestmentFile'
import {Col,Row,Form,Button} from "react-bootstrap"
import { CopyToClipboard } from 'react-copy-to-clipboard';
import axios from "axios"
import Loader from "../Components/Loader"
import Message from "../Components/Message"
import {investmentAction} from "../Actions/LoginAction"

const InvestmentDashboardScreen = () => {

  const params = useParams()
  const {userInfo} = useSelector(state=>state.investorSignup)
  const { sending, investInfo, failed } = useSelector(state => state.investmentInfo)
  const dispatch = useDispatch()
  const { id } = params 
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState("")
  const [image,setImage] = useState("")
  const [wallet,setWallet] = useState(userInfo?.wallet)
    // 19WQrjzgyzc1QRPCVChnjmXTD5GGgnErQ8
    const selected = investmentFile?.find(el => el.id === id)
    
  const copyAddress = () => {
    window.alert("Address copied!")
  }

  const handleFile = async (e) => {
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
           }
        }
        const image = e.target.files[0]
        const formData = new FormData()
        
        formData.append("file", image)
        formData.append("upload_preset", "demoReg")
        formData.append("cloud_name", "do133axxb")
        
        try {
            setLoading(true)
            const { data } = await axios.post(" https://api.cloudinary.com/v1_1/do133axxb/image/upload", formData, config)
            setImage(data.url)
            console.log(data.url)
            setLoading(false)
        } catch (error) {
          setError(error.message)
          setLoading(false)
          console.log("error",error)
        }
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(investmentAction(wallet,selected?.id,selected.amount,image))
  }
  
  useEffect(()=>{console.log(wallet)},[wallet])
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
              <Row>
                <Col><button className="copy_btn">Withdraw Funds</button></Col>
              </Row>
         </div>
         
      <Row>
        <Col md={4}>
           <h3 className="heading_selected">investment option selected : {id} package</h3>
           <h5 className="heading_details">Details</h5>
              <div className="investment_card">
                <Row>
                  <Col>
                    <h2 className='heading_one'>{selected?.id} Pack</h2>
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
                    <h3>Daily Profit</h3>
                  </Col>
                  <Col>
                <h3> {selected?.daily_profit }</h3>
                  </Col>
              </Row>
              <Row>
                  <Col>
                    <h3>Three (3) days Profit</h3>
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
                        <button className='copy_btn' onClick={copyAddress}>Click to Copy Address</button>
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
        </Col>
        <Col md={8}>
          <h3 className="heading_selected">After payment,Please submit proof of payment for verification and approval</h3>
          <Form className="investment_card" onSubmit={handleSubmit}>
            {loading ? <Loader /> : error ? <Message text={error} variant="danger" /> : sending ? <Loader /> : investInfo ? <Message text={investInfo.message} /> : failed && <Message text={failed } variant="danger"/>}
           
            <Form.Group>
              <Form.Label>Wallet</Form.Label>
              <Form.Control type="text" value={wallet} onChange={ (e)=>setWallet(e.target.value)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Package</Form.Label>
              <Form.Control type="text" value={selected?.id}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Amount paid</Form.Label>
              <Form.Control type="text" value={selected?.amount}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Payment Screenshot or file</Form.Label>
              <Form.Control type="file"  onChange={handleFile}/>
            </Form.Group>
           
            <Button className="mt-2" disabled={loading} type="submit">Submit</Button>
          </Form>
        </Col>
       </Row>
      </div>
  )
}

export default InvestmentDashboardScreen