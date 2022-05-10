import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userListReducer, userLoginReducer } from './reducers/user'

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userList: userListReducer,
})

const userInfoFromLocalStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null

const initialState = {
    userLogin: { userInfo: userInfoFromLocalStorage }
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store