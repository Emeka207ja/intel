import { COIN_UPDATE_FAIL, COIN_UPDATE_REQUEST, COIN_UPDATE_SUCCESS, PAYSTACK_FAIL, PAYSTACK_REQUEST, PAYSTACK_SUCCESS } from "../ActionCreators/PaymentActionCreator";


export const paystackPaymentReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case PAYSTACK_REQUEST:
            return { loading: true }
        case PAYSTACK_SUCCESS:
            return { loading: false, paymentInfo: payload }
        case PAYSTACK_FAIL:
            return { loading: false, error: payload }
        default:
            return state
    }
}

export const coinUpdateReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case COIN_UPDATE_REQUEST:
            return { loading: true };
        case COIN_UPDATE_SUCCESS:
            return { loading: false, coinVal: payload };
        case COIN_UPDATE_FAIL:
            return { loading: false, error: payload };
        default:
            return state
    }
}