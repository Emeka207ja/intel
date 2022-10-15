import axios from "axios"

import {
    STAKING_REQUEST,
    STAKING_SUCCESS,
    STAKING_FAIL,
    FETCH_ALL_STAKE_REQUEST,
    FETCH_ALL_STAKE_SUCCESS,
    FETCH_ALL_STAKE_FAIL,
    FETCH_SINGLE_STAKE_REQUEST,
    FETCH_SINGLE_STAKE_SUCCESS,FETCH_SINGLE_STAKE_FAIL
} from "../ActionCreators/StakingActionCreator"

export const placeStake = (amount, selected, rate, id) => async (dispatch, getState) => {
    console.log(amount,selected,rate,id)
    try {
        dispatch({ type: STAKING_REQUEST })
        const { login:{userInfo }} = getState();
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo?.token}`
            }
        }
        const { data } = await axios.post(`/api/stake/placestake/${id}`,{amount,selected,rate},config)
        console.log(data)
        dispatch({type:STAKING_SUCCESS, payload:data})
    } catch (error) {
        dispatch({ type: STAKING_FAIL, payload: error?.response?.data.message })
        console.log(error)
    }
}
export const fetchSingleStake = ( id) => async (dispatch, getState) => {
    try {
        dispatch({ type:  FETCH_SINGLE_STAKE_REQUEST,})
        const { login:{userInfo }} = getState();
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo?.token}`
            }
        }
        const { data } = await axios.get(`/api/stake/allstakes/${id}`,config)
        console.log(data)
        dispatch({type:FETCH_SINGLE_STAKE_SUCCESS, payload:data})
    } catch (error) {
        dispatch({ type: FETCH_SINGLE_STAKE_FAIL, payload: error?.response?.data.message })
        console.log(error)
    }
}
export const fetchAllStake = ( ) => async (dispatch, getState) => {
    try {
        dispatch({ type:  FETCH_ALL_STAKE_REQUEST,})
        const { login:{userInfo }} = getState();
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo?.token}`
            }
        }
        const { data } = await axios.get("/api/stake/allstakes",config)
        console.log(data)
        dispatch({type:FETCH_ALL_STAKE_SUCCESS, payload:data})
    } catch (error) {
        dispatch({ type: FETCH_ALL_STAKE_FAIL, payload: error?.response?.data.message })
        console.log(error)
    }
}