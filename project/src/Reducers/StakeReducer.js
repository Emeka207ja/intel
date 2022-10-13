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


export const placeStakeReducer = (state={},{type,payload}) => {
    switch (type) {
        case STAKING_REQUEST:
            return { loading: true };
        case STAKING_SUCCESS:
            return { loading: false, success: payload };
        case STAKING_FAIL:
            return { loading: false, error: payload };
        default:
            return state;
    }
}
export const fetchAllStakeReducer = (state={}, { type, payload }) => {
    switch (type) {
        case FETCH_ALL_STAKE_REQUEST:
            return { loading: true };
        case FETCH_ALL_STAKE_SUCCESS:
            return { loading: true, stakes: payload };
        case FETCH_ALL_STAKE_FAIL:
            return { loading: false, error: payload };
        default:
            return state;
    }
}
export const fetchSingleStakeReducer = (state={}, { type, payload }) => {
    switch (type) {
        case FETCH_SINGLE_STAKE_REQUEST:
            return { loading: true };
        case FETCH_SINGLE_STAKE_SUCCESS:
            return { loading: true, stake: payload };
        case FETCH_SINGLE_STAKE_FAIL:
            return { loading: false, error: payload };
        default:
            return state;
    }
}