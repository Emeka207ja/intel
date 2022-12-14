import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import { composeWithDevTools } from 'redux-devtools-extension'
import {
    fetchProfileReducer, loginReducer, updateProfileReducer,
    investorSignupReducer, investmentInfoReducer
} from './Reducers/LoginReducer'
import {
    deletePaymentReducer, deleteUserReducer, fetchAllProofReducer,
    fetchSinglePaymentProofReducer, fetchUsersReducer
} from './Reducers/AdminReducer'
import {
    placeStakeReducer,fetchAllStakeReducer,fetchSingleStakeReducer
} from "./Reducers/StakeReducer"
import UsersPage from './Views/Auth/User/Admin/UsersPage'
import { coinUpdateReducer, paystackPaymentReducer } from './Reducers/PaymentReducer'
import { fetchPriceReducer,updatePriceReducer } from './Reducers/PriceReducer'

const reducer = combineReducers({
    login: loginReducer,
    fetchUsers: fetchUsersReducer,
    fetchSinglePaymentProof: fetchSinglePaymentProofReducer,
    deleteUser: deleteUserReducer,
    deletePayment: deletePaymentReducer,
    fetchAllProof: fetchAllProofReducer,
    fetchProfile: fetchProfileReducer,
    updateProfile: updateProfileReducer,
    paystackPayment: paystackPaymentReducer,
    coinUpdate: coinUpdateReducer,
    investorSignup: investorSignupReducer,
    investmentInfo: investmentInfoReducer,
    placeStake: placeStakeReducer,
    fetchAllStake: fetchAllStakeReducer,
    fetchSingleStake: fetchSingleStakeReducer,
    fetchPrice: fetchPriceReducer,
    updatePrice:updatePriceReducer
})


const userInfoFromStorage = localStorage.getItem("loggedIn") ? JSON.parse(localStorage.getItem("loggedIn")) : null 
const investorFromStorage = localStorage.getItem("investorSignup") ? JSON.parse(localStorage.getItem("investorSignup")) : null 
const userStorage = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : []
const paymentStorage = localStorage.getItem("allPayments") ? JSON.parse(localStorage.getItem("allPayments")) : []

const initialState = {
    login: { userInfo: userInfoFromStorage },
    investorSignup:{userInfo:investorFromStorage},
    fetchUsers: { users: userStorage },
    fetchAllProof:{paymentInfo:paymentStorage}
}


const middleWare = [thunk]
const store = createStore( 
    reducer,
     initialState,
    composeWithDevTools(applyMiddleware(...middleWare))
)

export default store