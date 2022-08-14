import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'

import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import intel from '../Img/int.jpg'
import { logoutHandler } from '../../Actions/LoginAction'
const NavMenu = () => {
    const { userInfo } = useSelector(state => state.login)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logoutHandler())
        navigate('/login')
    }
    const handleUpdate = (id) => {
        navigate(`/updateprofile/${id}`)
    }
    const navigateToPaystackPaymentProofs = () => {
        navigate("/paystackhistory")
    }
    return (
        <div className=''>
            <Navbar bg='dark' variant='dark' sticky='top' className='d-flex justify-content-between px-3 active' expand='lg'>
                <Navbar.Brand>
                    <img src={intel} height='20px' width={'20px'} />
                    <span className='px-2'>INTEL WAVE</span>
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav fill className='d-flex justify-content-lg-start px-lg-5 active mr-auto'>
                        {/* <Link  href='/'>Home</Link> */}
                       {/* {!userInfo?.token&& <Nav.Link as ={Link} to="/home" className='px-lg-5'>Home</Nav.Link >} */}
                        <Nav.Link as ={Link} to="/home" className='px-lg-5'>Home</Nav.Link >
                        <Nav.Link as ={Link} to="/live" className='px-lg-5'>Live Market</Nav.Link >
                        {userInfo?.token&&userInfo?.isAdmin &&<Nav.Link as ={Link} to="/users" className='px-lg-5'>Users</Nav.Link >}
                       {userInfo?.token&&userInfo?.isAdmin && <Nav.Link as ={Link} to="/proofs" className='px-lg-5'>Payment proofs</Nav.Link >}
                        {/* <Nav.Link as ={Link} to="/updatepayment" className='px-lg-5'></Nav.Link > */}
                        {/* <Nav.Link as ={Link} to="/about"  className='px-lg-5'>About</Nav.Link> */}
                        {userInfo?.token&&<Nav.Link as ={Link} to="/profile"  className='px-lg-5'>Dashboard</Nav.Link>}
                        <NavDropdown title={userInfo?.token? userInfo.firstname:"gain access"}>
                            {!userInfo?.token&&<NavDropdown.Item as ={Link} to="/register">Register</NavDropdown.Item>}
                            {!userInfo?.token&&<NavDropdown.Item as ={Link} to="/login">Login</NavDropdown.Item>}
                            <NavDropdown.Item >
                                {userInfo?.token&&<button className='btn' onClick={handleLogout}>Logout</button>}
                            </NavDropdown.Item>
                            <NavDropdown.Item >
                                {userInfo?.token&&<button className='btn' onClick={()=>{handleUpdate(userInfo?._id)}}>Update Profile</button>}
                            </NavDropdown.Item>
                            <NavDropdown.Item >
                                {userInfo?.token&&userInfo?.isAdmin &&<button className='btn' onClick={navigateToPaystackPaymentProofs}>Paystack Payments</button>}
                            </NavDropdown.Item>
                        </NavDropdown>   
                   </Nav>
               </Navbar.Collapse>
               
            </Navbar>
      </div>
  )
}

export default NavMenu