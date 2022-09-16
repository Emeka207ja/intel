import React,{useEffect,useState} from 'react'
import { Container, Button, Form } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import {investSignupAction} from "../Actions/LoginAction"

const InvestmentAuthScreen = () => {
    const dispatch = useDispatch()
    const {loading,error,userInfo} = useSelector(state=>state.investorSignup)
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [wallet,setWallet] = useState("")
    const [password,setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(investSignupAction(name,email,password,wallet))
    }
    console.log(error)
    console.log(userInfo)
  return (
      <Container>
          <h3>Create Account</h3>
          <Form className="investment_card" onSubmit={handleSubmit}>
              <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control type= "text" value={name} onChange={(e)=>setName(e.target.value)} />
              </Form.Group>
              <Form.Group>
                  <Form.Label>Wallet</Form.Label>
                  <Form.Control type= "text" value={wallet} onChange={(e)=>setWallet(e.target.value)} />
              </Form.Group>
              <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type= "email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
              </Form.Group>
              <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type= "password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
              </Form.Group>
              <Form.Group>
                  <Form.Label> Confirm Password</Form.Label>
                  <Form.Control type= "password" value={password2} onChange={(e)=>setPassword2(e.target.value)}/>
              </Form.Group>
              <Button className="mt-2" type="submit" disabled>Create Account</Button>
          </Form>
    </Container>
  )
}

export default InvestmentAuthScreen