import React,{useState,useEffect} from 'react'
import Staking from "../Components/Staking"
import {Form,Button} from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { placeStake } from "../Actions/StakeAction"
import { fetchUserProfile } from '../Actions/LoginAction'
import  Message  from "../Components/Message"
import  Loader  from "../Components/Loader"


const StakeScreen = () => {
  const [selected, setSelected] = useState(30)
  const [amount, setAmount] = useState(500)
  const [valid, setValid] = useState(true)
  const [rate, setRate] = useState(0)
  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.login)
  const { loading, success, error } = useSelector(state => state.placeStake)
  const { profile } = useSelector(state => state.fetchProfile)
  const [low, setLow] = useState(false)
  const [disableBtn,setdisableBtn] = useState(true)
  const id = userInfo?._id
  const duration = [
    {
      id: 30,
      value:30
    },
    {
      id: 90,
      value:90
    },
    {
      id: 120,
      value:120
    }
  ]
  const handleClick = () => {
      dispatch(placeStake(amount,selected,rate,id))
  }
  // console.log(success)
  

  useEffect(() => {
    dispatch(fetchUserProfile(id))
    if (amount < 5000) {
    setValid(false)
    } else { setValid(true) }
    if (amount > userInfo?.intel) {
      setLow(true)
    } else { setLow(false) }
    if (selected === 30) {
      setRate(5)
      }
    if (selected === 90) {
        setRate(7)
      }
    if (selected === 120) {
        setRate(10)
    }
    
  }, [selected, amount,dispatch,valid,low,userInfo?.intel])
  
  useEffect(() => {
    if (success) {
      dispatch(fetchUserProfile(userInfo?._id))
    }
  },[ success,dispatch,userInfo?._id])
  useEffect(() => {
    if (profile?.intel < amount) { setdisableBtn(true) }
    if (amount < 5000) { setdisableBtn(true) }
    if (profile?.intel <= 0) { setdisableBtn(true) }
    else if(amount>profile?.intel){setdisableBtn(true)}
    else if(amount>=5000){setdisableBtn(false)}
  },[amount,profile?.intel])
  return (
    <div className='staking_container'>
      {
        loading ? <Loader /> : success ? <Message text={success.message} /> : error ? <Message text={error } />:"" 
       }
      {/* <Staking/> */}
      <div className="balance">
        <h2> Staking</h2>
        <h3 className={low&&"text-danger"}>Pf Bal.: {profile? profile.intel: "loading" } Intel Wave</h3>
       </div>
          <div className="staking_rate">
        <div>
          <img src="/assets/inte.jpg" alt="intel wave"/>
          <span>Intel Wave</span>
        </div>
        <h3>Monthly Rate : {selected===30? "5":selected===90?"7":selected===120&& "10" }%</h3>
      </div>
      <div className='staking_duration--container'>
        <h3>Duration (days)</h3>
        <div className='staking_duration'>
          {
            duration?.map(el => <div className={selected===el.id?"active":""} onClick={()=>setSelected(el.id)}>{el.value }</div>)
          }
        </div>
      </div>
      <Form  className="mt-2" id="myForm">
        <Form.Group>
          <Form.Label>Choose amount of intel wave to stake</Form.Label>
          <Form.Control type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <Form.Text className={!valid?"text-danger":low?"text-danger":""}>{disableBtn&&"low balance,minimum stakeable is 5000 intelwave" }</Form.Text>
        </Form.Group>
         <Button id="myForm"  variant="dark" className="mt-2 form-control" type="button" disabled={disableBtn}  onClick={handleClick}>Stake</Button>
      </Form>
    </div>
  )
}

export default StakeScreen