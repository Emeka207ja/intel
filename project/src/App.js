import React from 'react';
import { Routes,Route } from 'react-router-dom';
import './App.css';
import About from './Views/About';
import Login from './Views/Auth/Login';
import Register from './Views/Auth/Register';
import PaymentProofs from './Views/Auth/User/Admin/PaymentProofs';
import PaystackPaymentProofs from './Views/Auth/User/Admin/PaystackPaymentProofs';
import UpdatePayment from './Views/Auth/User/Admin/UpdatePayment';
import UpdateUser from './Views/Auth/User/Admin/UpdateUser';
import UsersPage from './Views/Auth/User/Admin/UsersPage';
import PaymentHistory from './Views/Auth/User/PaymentHistory';
import PaystackPage from './Views/Auth/User/PaystackPage';
import Profile from './Views/Auth/User/Profile';
import UpdateProfile from './Views/Auth/User/UpdateProfile';
import Demo from './Views/Demo';
import ForgotPassword from './Views/ForgotPassword';
import Home from './Views/Home';
import LiveChart from './Views/LiveChart';
import ResetPassword from './Views/ResetPassword';
import Welcome from './Views/WelcomePage';

function App() {
  // "proxy": "http://127.0.0.1:5000",
  return (
    <div>
      <Routes>
       
        <Route path='/' exact element={<Welcome />} />
         {/* <Route path='/home' exact element={<Home/> }/> */}
         <Route path='/about' exact element={<About/> }/>
        <Route path='/register' exact element={<Register/> }/>
        <Route path='/login' exact element={<Login/> }/>
        <Route path='/profile' exact element={<Profile/> }/>
        <Route path='/home' exact element={<Demo/> }/>
        <Route path='/users' exact element={<UsersPage/> }/>
        <Route path='/proofs' exact element={<PaymentProofs/> }/>
        <Route path='/updatepayment/:id' exact element={<UpdatePayment/> }/>
        <Route path='/updateuser/:id' exact element={<UpdateUser/> }/>
        <Route path='/updateprofile/:id' exact element={<UpdateProfile/> }/>
        <Route path='/resetpassword/:id' exact element={<ResetPassword/> }/>
        <Route path='/forgotpassword' exact element={<ForgotPassword/> }/>
        <Route path='/paystack/:id' exact element={<PaystackPage/> }/>
        <Route path='/live' exact element={<LiveChart/> }/>
        <Route path='/paymenthistory/:id' exact element={<PaymentHistory/> }/>
        <Route path='/paystackhistory' exact element={<PaystackPaymentProofs/> }/>
      </Routes>
    </div>
  );
}

export default App;
