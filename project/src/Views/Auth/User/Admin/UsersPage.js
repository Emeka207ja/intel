import React,{useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { deleteUser, fetchAllUsers } from '../../../../Actions/AdminAction'
import './users.css'

const UsersPage = () => {
    const dispatch = useDispatch()
    const Users = useSelector(state => state.fetchUsers)
    // const deleteState = useSelector(state => state.deletePayment)
    const { loading, success, users, error } = Users
    console.log(users)
    const navigate = useNavigate()
    const user = localStorage.getItem("users")
    console.log(users)
    useEffect(() => {
        dispatch(fetchAllUsers())
       
    }, [dispatch,user])

    const navigateAway = (val) => {
       navigate(`/updateuser/${val}`)
    }
    const handleDelete = (id) => {
        if (window.confirm(`sure you want do delete user ${id}?`)) {
            dispatch(deleteUser(id))
            dispatch(fetchAllUsers())
        }
    }
  return (
      <>
          <div className='users__container'>
              {loading && <p className='users__loading'>loading...</p>}
              {error && <p className='users__error'>{error }</p>}
              {!loading &&( users?.length===0) && <p className='users__empty'>no users yet</p>}
              {/* {users && !loading&& users.map(user => {
                  return (
                      <div key={user._id} className='users'>
                          <h3>firstname:{ user.firstname}</h3>
                          <h3>lastname:{ user.lastname}</h3>
                          <h3>email:{user.email}</h3>
                          <h3>Intel:{user.intel}</h3>
                          <h3>referral Bonus:{user.referal}</h3>
                          <button className='btn btn-primary' onClick={()=>navigateAway(user._id)}>edit</button>
                          <button className='btn btn-danger btn__left' onClick={()=>{handleDelete(user._id)}}>delete</button>
                      </div>
                  )
              })} */}
              {/*  */}
              {users &&!loading &&            <div className='table-responsive'>  <table className='table users__table container '>
                  <thead>
                      <tr>
                          <th scope='col'>Id</th>
                          {/* <th  scope='col'>Firstname</th> */}
                          {/* <th  scope='col'>Lastname</th> */}
                          <th  scope='col'>name</th>
                          <th  scope='col'>Intel</th>
                          <th  scope='col'>Ref. bonus</th>
                          <th  scope='col'>Referred by</th>
                          <th colSpan='2'  scope='col'>Action</th>
                      </tr>
                  </thead>
                  <tbody>
                      {user && !loading && users.map((user,index) => {
                          return (
                              <tr  scope='row'>
                                  <td>{index+1 }</td>
                                  {/* <td>{user.firstname }</td> */}
                                  {/* <td>{user.lastname }</td> */}
                                  <td>{user.firstname }</td>
                                  <td>{user.intel }</td>
                                  <td>{user.referal }</td>
                                  <td>{user.referredBy }</td>
                                  <td><button className='btn btn-primary'  onClick={()=>navigateAway(user._id)}>update</button></td>
                                  <td><button className='btn btn-danger' onClick={()=>{handleDelete(user._id)}}>delete</button></td>
                                 
                              </tr>
                          )
                      })}
                  </tbody>
              </table> </div>}
          </div>
    </>
  )
}

export default UsersPage