import { DELETE_PAYMENT_FAIL, DELETE_PAYMENT_REQUEST, DELETE_PAYMENT_SUCCESS, DELETE_USER_FAIL, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, FETCH_ALL_PAYMENT_FAIL, FETCH_ALL_PAYMENT_REQUEST, FETCH_ALL_PAYMENT_SUCCESS, FETCH_PAYMENT_FAIL, FETCH_PAYMENT_REQUEST, FETCH_PAYMENT_SUCCESS, FETCH_USER_FAIL, FETCH_USER_REQUEST, FETCH_USER_SUCCESS } from "../ActionCreators/AdminActionCreator";

export const fetchUsersReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case FETCH_USER_REQUEST:
            return { loading: true, success:false }
        case FETCH_USER_SUCCESS:
            return { loading: false, success: true, users: payload }
        case FETCH_USER_FAIL:
            return { loading: false, success: false, error: payload }
        default:
            return state
     }
}

export const fetchSinglePaymentProofReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case FETCH_PAYMENT_REQUEST:
            return { loading: true }
        case FETCH_PAYMENT_SUCCESS:
            return { loading: false, paymentInfo: payload }
        case FETCH_PAYMENT_FAIL:
            return { loading: false, error: payload }
        default:
            return state
    }
}
export const fetchAllProofReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case FETCH_ALL_PAYMENT_REQUEST:
            return { loading: true }
        case FETCH_ALL_PAYMENT_SUCCESS:
            return { loading: false, paymentInfo: payload }
        case FETCH_ALL_PAYMENT_FAIL:
            return { loading: false, error: payload }
        default:
            return state
    }
}

export const deletePaymentReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case DELETE_PAYMENT_REQUEST:
            return { loading: true }
        case DELETE_PAYMENT_SUCCESS:
            return { loading: false, proof: payload }
        case DELETE_PAYMENT_FAIL:
            return { loading: false, error: payload }
        default:
            return state
    }
}
export const deleteUserReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case DELETE_USER_REQUEST:
            return { loading: true, success: false }
        case DELETE_USER_SUCCESS:
            return { loading: false, success: true, proof: payload }
        case DELETE_USER_FAIL:
            return { loading: false, success: false, error: payload }
        default:
            return state;
    }
}