import { FETCH_PROFILE_FAILED, FETCH_PROFILE_REQUEST, FETCH_PROFILE_SUCCESS, LOGIN_FAILED, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, UPDATE_PROFILE_FAILED, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS,INVESTOR_SIGNUP_REQUEST,INVESTOR_SIGNUP_SUCCESS,INVESTOR_SIGNUP_FAILED,INVESTMENT_INFO_REQUEST,INVESTMENT_INFO_SUCCESS,INVESTMENT_INFO_FAILED } from "../ActionCreators/LoginActionCreator";

export const loginReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case LOGIN_REQUEST:
            return { loading: true,success:false }
        case LOGIN_SUCCESS:
            return { loading: false, success: true, userInfo: payload }
        case LOGIN_FAILED:
            return { loading: false, success: false, error: payload }
        case LOGOUT:
            return {}
        default:
            return state
    }
}

export const investorSignupReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case INVESTOR_SIGNUP_REQUEST:
            return { loading: true };
        case INVESTOR_SIGNUP_SUCCESS:
            return { loading: false, success: true, userInfo: payload };
        case INVESTOR_SIGNUP_FAILED:
            return { loading: false, success: false, error: payload };
        
        default:
            return state
    }
}
export const investmentInfoReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case INVESTMENT_INFO_REQUEST:
            return { sending: true };
        case INVESTMENT_INFO_SUCCESS:
            return { sending: false, success: true, investInfo: payload };
        case INVESTMENT_INFO_FAILED:
            return { sending: false, success: false, failed: payload };
        default:
            return state
    }
}
export const fetchProfileReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case FETCH_PROFILE_REQUEST:
            return { loading: true }
        case FETCH_PROFILE_SUCCESS:
            return { loading: false, profile: payload }
        case FETCH_PROFILE_FAILED:
            return { loading: false, error: payload }
        default:
            return state
    }
}

export const updateProfileReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case UPDATE_PROFILE_REQUEST:
            return { updating: true }
        case UPDATE_PROFILE_SUCCESS:
            return { updating: false, success: payload }
        case UPDATE_PROFILE_FAILED:
            return { updating: false, failed: payload }
        default:
            return state
    }
}