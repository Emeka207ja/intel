import axios from 'axios'
import { PAYSTACK_FAIL, PAYSTACK_REQUEST, PAYSTACK_SUCCESS } from '../ActionCreators/PaymentActionCreator'

export const postPaystackPaymentAction = (status, reference, amount) => async (dispatch, getState) => {
    console.log(status,reference,amount)
    try {
        dispatch({ type: PAYSTACK_REQUEST })
        const { login: { userInfo } } = getState()
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization :`Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post("/api/payment/paystack",{status,reference,amount},config)
        dispatch({type:PAYSTACK_SUCCESS,payload:data})
    } catch (error) {
        dispatch({type:PAYSTACK_FAIL,payload:error.response.data.message})
    }
}