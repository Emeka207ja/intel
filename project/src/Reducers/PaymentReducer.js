import { PAYSTACK_FAIL, PAYSTACK_REQUEST, PAYSTACK_SUCCESS } from "../ActionCreators/PaymentActionCreator";


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