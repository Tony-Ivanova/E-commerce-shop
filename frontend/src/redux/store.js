import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productDetailsReducer, productListReducer } from './reducers/product'
import { cartReducer } from './reducers/cart'
import { userLoginReducer } from './reducers/user'

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
})

const cartItemsFromLocalStorage = localStorage.getItem('cartItems') 
? JSON.parse(localStorage.getItem("cartItems"))
:[]

const userInfoFromLocalStorage = localStorage.getItem('userInfo') 
? JSON.parse(localStorage.getItem("userInfo"))
:null

const initialState = {
    cart: {
        cartItems: cartItemsFromLocalStorage
    },
    userLogin: {userInfo: userInfoFromLocalStorage}
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store