import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import { composeWithDevTools } from 'redux-devtools-extension'
import { fetchProfileReducer, loginReducer, updateProfileReducer } from './Reducers/LoginReducer'
import { deletePaymentReducer, deleteUserReducer, fetchAllProofReducer, fetchSinglePaymentProofReducer, fetchUsersReducer } from './Reducers/AdminReducer'
import UsersPage from './Views/Auth/User/Admin/UsersPage'

const reducer = combineReducers({
    login: loginReducer,
    fetchUsers: fetchUsersReducer,
    fetchSinglePaymentProof: fetchSinglePaymentProofReducer,
    deleteUser: deleteUserReducer,
    deletePayment: deletePaymentReducer,
    fetchAllProof: fetchAllProofReducer,
    fetchProfile: fetchProfileReducer,
    updateProfile:updateProfileReducer
})


const userInfoFromStorage = localStorage.getItem("loggedIn") ? JSON.parse(localStorage.getItem("loggedIn")) : null 
const userStorage = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : []
const paymentStorage = localStorage.getItem("allPayments") ? JSON.parse(localStorage.getItem("allPayments")) : []

const initialState = {
    login: { userInfo: userInfoFromStorage },
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