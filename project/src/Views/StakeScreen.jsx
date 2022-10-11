import React,{useState,useEffect} from 'react'
import Staking from "../Components/Staking"
import {Form,Button} from "react-bootstrap"
import {useSelector} from "react-redux"

const StakeScreen = () => {
  const [selected, setSelected] = useState(30)
  const [amount, setAmount] = useState(500)
  const [valid, setValid] = useState(true)
  const { userInfo } = useSelector(state => state.login)
  const [low,setLow] = useState(false)
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
    const handleClick = ()=>{
      console.log(amount)
      window.alert("Development in progress Cheers!")
      setAmount("")
    }
  

  useEffect(() => {
    if (amount < 5000) {
    setValid(false)
    } else { setValid(true) }
    if (amount > userInfo?.intel) {
      setLow(true)
    }else{setLow(false)}
  }, [selected, amount, userInfo?.intel])

  return (
    <div className='staking_container'>
      {/* <Staking/> */}
      <div className="balance">
        <h2> Staking</h2>
        <h3 className={low&&"text-danger"}>Pf Bal.: {userInfo.intel } Intel Wave</h3>
       </div>
          <div className="staking_rate">
        <div>
          <img src="/assets/inte.jpg" />
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
      <Form  className="mt-2" >
        <Form.Group>
          <Form.Label>Choose amount of intel wave to stake</Form.Label>
          <Form.Control type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <Form.Text className={!valid?"text-danger":low?"text-danger":""}>{!valid?"minimum stakeable is 5000 intel wave coin":low?"insufficient intel Wave balance":"" }</Form.Text>
        </Form.Group>
         <Button  variant="dark" className="mt-2 form-control" type="button" disabled={!valid||low}  onClick={handleClick}>Stake</Button>
      </Form>
    </div>
  )
}

export default StakeScreen