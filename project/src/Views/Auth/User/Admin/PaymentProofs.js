import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import './proofs.css'
import { deletePayment, fetchAllPayment } from '../../../../Actions/AdminAction'

const PaymentProofs = () => {
  const dispatch = useDispatch()
  const { loading: deleting, error: failed, proof } = useSelector(state => state.deletePayment)
  const {loading,error,paymentInfo} = useSelector(state=>state.fetchAllProof)
  const navigate = useNavigate()
 
  /////////
  const payments = localStorage.getItem("allPayments")
  useEffect(() => {
    dispatch(fetchAllPayment())
  }, [dispatch,payments])
////////////////
  const handleUpdate = (val) => {
    navigate(`/updatepayment/${val}`)
  }
  ///////
  const handleDelete = (id) => {
    if (window.confirm(`are sure you want to delete payment ${id}`)) {
      dispatch(deletePayment(id))
    }
  }
  return (
    <div className='proof__containers'>
      {loading && <p className='proof__loading'>loading...</p>}
      {error && <p className='proof__error'>{error}</p>}
      {paymentInfo&&paymentInfo.length===0 && <p className='proof__empty'>no payments yet</p>}
      <section className='proofs__item'>
        {deleting&&<p>deleting</p>}
        {paymentInfo?.map(el => {
          return (
            <div key={el._id} className='item py-3'>
              
              <img src={`/profile${el.image}`}  />
              <h3 className='py-2'>wallet: {el.wallet }</h3>
              <h3 className='py-2'>Firstname: {el.user[0].firstname }</h3>
              <h3 className='py-2'>lastname: {el.user[0].lastname }</h3>
              <h3 className='py-2'>email: {el.user[0].email}</h3>
              <h3 className='py-2'>status: {el.status}</h3>
              <button className='btn btn-primary' id='update' onClick={()=>{handleUpdate(el._id)}}>update status</button>
            <button className='btn btn-danger' id='delete' onClick={()=>{handleDelete(el._id)}}>delete</button>
            </div>
          )
        })}
      </section>
    </div>
  )
}

export default PaymentProofs