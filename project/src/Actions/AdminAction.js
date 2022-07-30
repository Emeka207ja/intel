import axios from 'axios'
import { DELETE_PAYMENT_FAIL, DELETE_PAYMENT_REQUEST, DELETE_PAYMENT_SUCCESS, DELETE_USER_FAIL, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, FETCH_ALL_PAYMENT_FAIL, FETCH_ALL_PAYMENT_REQUEST, FETCH_ALL_PAYMENT_SUCCESS, FETCH_PAYMENT_FAIL, FETCH_PAYMENT_REQUEST, FETCH_PAYMENT_SUCCESS, FETCH_USER_FAIL, FETCH_USER_REQUEST, FETCH_USER_SUCCESS } from '../ActionCreators/AdminActionCreator'

export const fetchAllUsers = () => async (dispatch, getState) => {
    try {
        dispatch({ type: FETCH_USER_REQUEST })
        const { login: { userInfo } } = getState()
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get("/api/admin/users", config)
        dispatch({ type: FETCH_USER_SUCCESS, payload: data })
       
        localStorage.setItem("users", JSON.stringify(data))
    } catch (error) {
        dispatch({ type: FETCH_USER_FAIL, payload: error.response.data.message })
    }
};

export const fetchSinglePayment = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: FETCH_PAYMENT_REQUEST })
        const { login: { userInfo } } = getState()
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        console.log(userInfo.token)
        const { data } = await axios.get(`/api/admin/payment/${id}`,config)
        dispatch({type:FETCH_PAYMENT_SUCCESS,payload:data})
    } catch (error) {
        dispatch({type:FETCH_PAYMENT_FAIL,payload:error.response.data.message})
    }
}

export const fetchAllPayment = () => async (dispatch, getState) => {
    try {
        dispatch({ type: FETCH_ALL_PAYMENT_REQUEST })
        const { login: { userInfo } } = getState()
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        console.log(userInfo.token)
        const { data } = await axios.get("/api/admin/payment",config)
        dispatch({ type: FETCH_ALL_PAYMENT_SUCCESS, payload: data })
        localStorage.setItem("allPayments", JSON.stringify(data))
    } catch (error) {
        dispatch({type:FETCH_ALL_PAYMENT_FAIL,payload:error.response.data.message})
    }
}

export const deletePayment = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: DELETE_PAYMENT_REQUEST })
        const { login: { userInfo } } = getState()
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = axios.delete(`/api/admin/payment/${id}`, config)
        dispatch({ type: DELETE_PAYMENT_SUCCESS, payload: data })
        localStorage.removeItem("allPayments")
    } catch (error) {
        dispatch({type:DELETE_PAYMENT_FAIL,payload:error.response.data.message})
    }
}
export const deleteUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: DELETE_USER_REQUEST })
        const { login: { userInfo } } = getState()

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        
        const { data } = axios.delete(`/api/admin/user/${id}`, config)
        dispatch({ type: DELETE_USER_SUCCESS, payload: data })
        localStorage.removeItem('users')
    } catch (error) {
        dispatch({type:DELETE_USER_FAIL,payload:error.response.data.message})
    }
}