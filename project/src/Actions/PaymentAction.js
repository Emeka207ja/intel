import axios from 'axios'
import { COIN_UPDATE_FAIL, COIN_UPDATE_REQUEST, COIN_UPDATE_SUCCESS, PAYSTACK_FAIL, PAYSTACK_REQUEST, PAYSTACK_SUCCESS } from '../ActionCreators/PaymentActionCreator'

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

export const coinUpdateHandler = (coin, id) => async (dispatch, getState) => {
    try {
        dispatch({ type: COIN_UPDATE_REQUEST })
        const {login:{userInfo}} = getState()
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`/api/user/paystack/${id}`, { coin }, config)
        dispatch({type:COIN_UPDATE_SUCCESS,payload:data})
    } catch (error) {
        dispatch({type:COIN_UPDATE_FAIL,payload:error.response.data.message})
    }
}