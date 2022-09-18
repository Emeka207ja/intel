import axios from 'axios'
import { FETCH_PROFILE_FAILED, FETCH_PROFILE_REQUEST, FETCH_PROFILE_SUCCESS, LOGIN_FAILED, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, UPDATE_PROFILE_FAILED, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS,INVESTOR_SIGNUP_REQUEST,INVESTOR_SIGNUP_SUCCESS,INVESTOR_SIGNUP_FAILED,INVESTMENT_INFO_REQUEST,INVESTMENT_INFO_SUCCESS,INVESTMENT_INFO_FAILED } from '../ActionCreators/LoginActionCreator'

export const loginAction = (email, password) => async(dispatch, getState) => {
    try {
        dispatch({ type: LOGIN_REQUEST })
        const { data } = await axios.post("/api/user/login",{email,password})
        dispatch({ type: LOGIN_SUCCESS, payload: data })
        localStorage.setItem("loggedIn",JSON.stringify(data))
    } catch (error) {
        dispatch({ type: LOGIN_FAILED, payload: error.response.data.message })
        if(error){
            console.log("error",error)
        }
    }
}
export const investSignupAction = (name,email, password,wallet) => async(dispatch, getState) => {
    try {
        dispatch({ type: INVESTOR_SIGNUP_REQUEST })
        const { data } = await axios.post("/api/investment/invest",{name,email,password,wallet})
        dispatch({ type: INVESTOR_SIGNUP_SUCCESS, payload: data })
        localStorage.setItem("investorSignup",JSON.stringify(data))
    } catch (error) {
        dispatch({ type: INVESTOR_SIGNUP_FAILED, payload: error.response.data.message })
        if(error){
            console.log("error",error)
        }
    }
}
export const investmentAction = (wallet,pack,amount,image) => async(dispatch, getState) => {
    try {
        dispatch({ type: INVESTMENT_INFO_REQUEST })

        const { investorSignup: {userInfo} } = getState()
        console.log("token",userInfo.token)
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
           }
        }

        const { data } = await axios.post("/api/investment/investinfo", { wallet, pack, amount, image },config)
        
        dispatch({ type: INVESTMENT_INFO_SUCCESS, payload: data })
        console.log("invest",data)

    } catch (error) {
        dispatch({ type: INVESTMENT_INFO_FAILED, payload: error.response.data.message })
        if(error){
            console.log("error",error)
        }
    }
}

export const logoutHandler = () => (dispatch) => {
    dispatch({ type: LOGOUT })
    localStorage.removeItem("loggedIn")
}

export const fetchUserProfile = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: FETCH_PROFILE_REQUEST })
        const { login: { userInfo } } = getState()
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/user/updateprofile/${id}`,config)
        dispatch({type:FETCH_PROFILE_SUCCESS,payload:data})
        
    } catch (error) {
        dispatch({type:FETCH_PROFILE_FAILED,payload:error.response.data.message})
    }
}
export const updateUserProfile = (id,firstname,lastname,email,password) => async (dispatch, getState) => {
    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST })
        const { login: { userInfo } } = getState()
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`/api/user/updateprofile/${id}`,{firstname,lastname,email,password},config)
        dispatch({type:UPDATE_PROFILE_SUCCESS,payload:data})
        
    } catch (error) {
        dispatch({type:UPDATE_PROFILE_FAILED,payload:error.response.data.message})
    }
}