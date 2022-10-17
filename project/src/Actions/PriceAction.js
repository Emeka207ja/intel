import axios from "axios"
import {
    FETCH_PRICE_REQUEST,
    FETCH_PRICE_SUCCESS,
    FETCH_PRICE_FAIL,
    UPDATE_PRICE_REQUEST,
    UPDATE_PRICE_SUCCESS,
    UPDATE_PRICE_FAIL,
} from "../ActionCreators/PriceActioncreator"

export const fetchPriceAction = () => async(dispatch, getState) => {
    dispatch({ type: FETCH_PRICE_REQUEST })
    try {
        const { login: { userInfo } } = getState()
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo?.token}`
            }
        }
        const { data } = await axios.get("/api/price/allprice", config) 
        dispatch({type:FETCH_PRICE_SUCCESS,payload:data})
    } catch (error) {
        dispatch({type:FETCH_PRICE_FAIL,payload:error.response.data.message})
    }
}
export const updatePriceAction = (usdtPrice1,usdtPrice2,intelPrice,rate,id) => async(dispatch, getState) => {
    dispatch({ type:  UPDATE_PRICE_REQUEST })
    try {
        const { login: { userInfo } } = getState()
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo?.token}`
            }
        }
        const { data } = await axios.put(`/api/price/allprice/${id}`,{usdtPrice1,usdtPrice2,intelPrice,rate}, config) 
        dispatch({type: UPDATE_PRICE_SUCCESS,payload:data})
    } catch (error) {
        dispatch({type: UPDATE_PRICE_FAIL,payload:error.response.data.message})
    }
}