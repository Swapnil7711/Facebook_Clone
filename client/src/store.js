import { createStore, applyMiddleware, combineReducers } from "redux"
import thunk from "redux-thunk"
import { loginReducer, registerReducer, userDetailsReducer, userLogoutReducer } from "./reducers/registerReducer"
import { createPostReducer, getPostsReducer } from "./reducers/postsreducer"
import { composeWithDevTools } from 'redux-devtools-extension'


const reducer = combineReducers({
    userRegister: registerReducer,
    userLogin: loginReducer,
    userDetails: userDetailsReducer,
    userLogout: userLogoutReducer,
    createdPost: createPostReducer,
    getPosts: getPostsReducer
})

const localStorageUser = localStorage.getItem("userInfo") ? (JSON.parse(localStorage.getItem("userInfo"))) : {};

console.log("localstorage", localStorageUser)

const localStorageUserDetails = localStorage.getItem("userDetails") ? JSON.parse(localStorage.getItem("userDetails")) : {};


const initialState = { userLogin: localStorageUser, userDetails: localStorageUserDetails }

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;