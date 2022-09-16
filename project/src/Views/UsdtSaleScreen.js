import React,{useEffect,useState} from "react"
import { Container, Row, Col, Form, Button, Card, ListGroup, ListGroupItem } from "react-bootstrap"
import axios from "axios"
import PaystackPop from '@paystack/inline-js'

const UsdtSaleScreen = () => {

    const [amount, setAmount] = useState(0)
    const [value,setValue] = useState(0)
    const [wallet, setWallet] = useState("")
    const [payStackId, setPaystackId] = useState()
    const [lastname,setLastname] = useState("")
    const [email,setEmail] = useState("")
    
    const fetchPaystackKey = async () => {
        const config = {
            headers: {
                "Content-type": "application-json",
            }
        }
        try {
            const { data } = await axios.get("/api/user/paystackpub", config)
            setPaystackId(data)
           
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
       
        if (Number(amount) <= 400) {
           setValue(Number(amount)*630)
        }
        if (Number(amount)>= 500) {
           setValue(Number(amount)*610)
        }
         fetchPaystackKey()
    },[amount])

    const handlePay = (e) => {
        e.preventDefault()
        const payStack = new PaystackPop()
        payStack.newTransaction({
             key: payStackId,
            amount:value*100,
            firstname: wallet,
            email: email,
            lastname:lastname,
            onSuccess(transaction) {
                setWallet("")
                setAmount("")
                setEmail("")
                setLastname("")
                console.log(transaction)
            },
            onCancel() {
                console.log("cancelled")
            }
        })
       
    }
    return (
        <Container className="py-3">
            <Row>
                <Col md={4}>
                    <h3 className="text-primary">Buy USDT at the best rate!</h3>
                    <h5>We offer the best <span className="text-danger">RATE</span> in the market</h5>
                    <div className="px-3  investment_card">
                        <h3 className="text-center">Enjoy our premium prices </h3>
                        
                        <Row>
                            <Col><h5>100 USDT - 400USDT</h5></Col>
                            <Col><h5>&#8358; 630 per USDT</h5></Col>
                        </Row>
                    
                        <Row>
                            <Col><h5>500 USDT - 1000 USDT</h5></Col>
                            <Col><h5>&#8358; 610 per USDT</h5></Col>
                        </Row>
    
                       <h5>Minimium USDT purchaseable= 100 USDT</h5>
                        <h5>maximium USDT purchaseable = 1000 USDT</h5>
                    </div>
                </Col>
                <Col md={8}>
                    <Form onSubmit={handlePay} className="investment_card mt-3">
                        <Form.Group>
                            <Form.Label>Enter number of USDT</Form.Label>
                            <Form.Control type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
                            <Form.Text className={Number(amount) < 100 || Number(amount) > 1000 ? "text-danger" : "text-primary"}> &#8358;
                                {Number(amount)<=400? Number(amount) * 630 :  Number(amount) * 610}</Form.Text>
                           
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Input your TRC20 address</Form.Label>
                            <Form.Control type="text" value={wallet} onChange={(e)=>setWallet(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Input your Email Address</Form.Label>
                            <Form.Control type="text" value={email} onChange={(e)=>setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Input your Name</Form.Label>
                            <Form.Control type="text" value={lastname} onChange={(e)=>setLastname(e.target.value)} />
                        </Form.Group>
                        <Button variant="dark rounded" className="mt-2" disabled={Number(amount) < 100 || Number(amount) > 1000} type="submit">Purchase</Button>
                        
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default UsdtSaleScreen