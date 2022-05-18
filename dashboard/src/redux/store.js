import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userListReducer, userLoginReducer } from './reducers/user'
import { productCreateReducer, productDeleteReducer, productEditReducer, productsListReducer, productUpdateReducer } from './reducers/product'
import { orderDetailsReducer, orderListReducer } from './reducers/order'

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userList: userListReducer,
    productsList: productsListReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productEdit: productEditReducer,
    productUpdate: productUpdateReducer,
    orderList: orderListReducer,
    orderDetails: orderDetailsReducer,
    orderDelivered: orderDetailsReducer,
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