import {
    FETCH_PRICE_REQUEST,
    FETCH_PRICE_SUCCESS,
    FETCH_PRICE_FAIL,
    UPDATE_PRICE_REQUEST,
    UPDATE_PRICE_SUCCESS,
    UPDATE_PRICE_FAIL,
} from "../ActionCreators/PriceActioncreator"

export const fetchPriceReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case FETCH_PRICE_REQUEST:
            return { loading: true };
        case FETCH_PRICE_SUCCESS:
            return { loading: false, price: payload };
        case FETCH_PRICE_FAIL:
            return { loading: false, error: payload };
        default:
            return state;
    }
}

export const updatePriceReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case UPDATE_PRICE_REQUEST:
            return { loading: true };
        case UPDATE_PRICE_SUCCESS:
            return { loading: false, successMsg: payload };
        case UPDATE_PRICE_FAIL:
            return { loading: false, errorMsg: payload };
        default:
            return state;
    }
}