import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Marquee from "react-fast-marquee";
import {navData,GeneralAuthRoute,authAdminPath,AdminDropDown,AuthUser} from "./Nav.data.js"
import { LinkContainer } from "react-router-bootstrap"
import {  Nav, Navbar, NavDropdown } from 'react-bootstrap'
import intel from '../Img/int.jpg'
import "./Nav.css"
import { logoutHandler } from '../../Actions/LoginAction'
import MarqueeLTC from '../Auth/User/MarqueeLTC';
import Marques from '../Auth/User/Marques';
import MarqueEth from '../Auth/User/MarqueEth';
import MarqueMatic from '../Auth/User/MarqueMatic';
import MarqueeUsdt from '../Auth/User/MarqueeUsdt';
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
            <Marquee className='react_marquee' speed={50} >
                  <MarqueeLTC />
                  <Marques />
                  <MarqueEth />
                   <MarqueeUsdt />
                   <MarqueMatic/>
              </Marquee>
            <Navbar collapseOnSelect variant='dark' sticky='top'  className='d-flex justify-content-between px-3 active navbar-fixed-top custom_class' expand='lg '>
                <Navbar.Brand>
                    <img src={intel} height='20px' width={'20px'} alt = "intelwave"/>
                    <span className='px-2'>INTEL WAVE</span>
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav fill className='d-flex justify-content-lg-start px-lg-5 active mr-auto'>
                        {
                            navData?.map(data => {
                                return (
                                    <LinkContainer to = {data.path} key={data.id}>
                                        <Nav.Link className=' px-lg-5 '>{ data.name}</Nav.Link>
                                    </LinkContainer>
                                )
                            })
                        }
                        {
                            authAdminPath?.map(data =>{
                                if (userInfo?.token && userInfo?.isAdmin) {
                                    return <LinkContainer to = {data.path} key={data.id}>
                                        <Nav.Link className='px-lg-5'>{ data.name}</Nav.Link>
                                    </LinkContainer>
                                }else{
                                    return null
                                }
                                
                            })
                        }
                        
                        <NavDropdown title={userInfo?.token ? userInfo.firstname : "gain access"}>
                            {
                                GeneralAuthRoute?.map((data) => {
                                    if(!userInfo?.token){
                                        return <LinkContainer to={data.path} key={data.id}>
                                            <NavDropdown.Item >{ data.name}</NavDropdown.Item>
                                        </LinkContainer>
                                    } else {
                                        return null;
                                    }
                                })
                            }
                            {
                                AdminDropDown?.map(data => {
                                    if(userInfo?.token&&userInfo?.isAdmin){
                                        return <LinkContainer to={data.path} key={data.id}>
                                            <NavDropdown.Item >{ data.name}</NavDropdown.Item>
                                        </LinkContainer>
                                    }else{
                                        return null;
                                    }
                               })
                            }
                            {
                                AuthUser?.map(data => {
                                    if (userInfo?.token) {
                                        return <LinkContainer to={data.path} key={data.id}>
                                            <NavDropdown.Item>{data.name }</NavDropdown.Item>
                                        </LinkContainer>
                                    }else{
                                        return null;
                                    }
                                })
                            }
                            
                             <NavDropdown.Item >
                                {userInfo?.token&&<button className='btn' onClick={()=>{handleUpdate(userInfo?._id)}}>Update Profile</button>}
                            </NavDropdown.Item>

                             <NavDropdown.Item >
                                {userInfo?.token&&userInfo?.isAdmin &&<button className='btn' onClick={navigateToPaystackPaymentProofs}>Paystack Payments</button>}
                            </NavDropdown.Item>

                            <NavDropdown.Item >
                                {userInfo?.token&&<button className='btn' onClick={handleLogout}>Logout</button>}
                            </NavDropdown.Item>
                        </NavDropdown>









                        {/* <Nav.Link as ={Link} to="/home" className=' px-lg-5 '>Home</Nav.Link >
                        <Nav.Link as ={Link} to="/buyusdt" className=' px-lg-5 '>Buy Usdt</Nav.Link >
                        <Nav.Link as ={Link} to="/stake" className=' px-lg-5 '>Staking</Nav.Link >
                        <Nav.Link as ={Link} to="/live" className='px-lg-5 '>Live Market</Nav.Link >
                        {userInfo?.token&&userInfo?.isAdmin &&<Nav.Link as ={Link} to="/users" className=' px-lg-5'>Users</Nav.Link >}
                       {userInfo?.token&&userInfo?.isAdmin && <Nav.Link as ={Link} to="/proofs" className='px-lg-5'>Payment proofs</Nav.Link >}
                        {userInfo?.token&&<Nav.Link as ={Link} to="/profile"  className='px-lg-5'>Dashboard</Nav.Link>} */}
                        {/* <NavDropdown title={userInfo?.token? userInfo.firstname:"gain access"}>
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
                            <NavDropdown.Item >
                                {userInfo?.token&&userInfo?.isAdmin &&<NavDropdown.Item as ={Link} to="/updateprice">Prices</NavDropdown.Item>}
                            </NavDropdown.Item>
                        </NavDropdown>    */}
                   </Nav>
               </Navbar.Collapse>
               
            </Navbar>
      </div>
  )
}

export default NavMenu