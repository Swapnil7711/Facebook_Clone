import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    REGISTER_REQUEST,

    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,

    REGISTER_LOGOUT_REQUEST,
    LOGOUT_REQUEST_CLEAR,

    USER_DETAILS_FAIL,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_REQUEST,

    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL
} from "../constants/registerConstants"



export const registerReducer = (state = { userkeys: {} }, action) => {

    switch (action.type) {

        case REGISTER_REQUEST:
            return { loading: true }

        case REGISTER_SUCCESS:
            return { loading: false, userkeys: action.payload }


        case REGISTER_LOGOUT_REQUEST:
            return {}

        case REGISTER_FAIL:
            return { error: action.payload }

        default:
            return state;
    }

}

export const loginReducer = (state = { userkeys: {} }, action) => {

    switch (action.type) {

        case LOGIN_REQUEST:
            return { loading: true }

        case LOGIN_SUCCESS:
            return { loading: false, userkeys: action.payload }

        case LOGIN_FAIL:
            return { error: action.payload }

        case LOGOUT_REQUEST_CLEAR:
            return {}

        default:
            return state;
    }

}

export const userDetailsReducer = (state = {}, action) => {

    switch (action.type) {

        case USER_DETAILS_REQUEST:
            return { loading: true }

        case USER_DETAILS_SUCCESS:
            return { loading: false, userDetails: action.payload }

        case USER_DETAILS_FAIL:
            return { error: action.payload }

        default:
            return state;
    }

}


export const userLogoutReducer = (state = {}, action) => {

    switch (action.type) {

        case LOGOUT_REQUEST:
            return { loading: true }

        case LOGOUT_SUCCESS:
            return { logout: action.payload }

        case LOGOUT_FAIL:
            return { error: action.payload }

        default:
            return state;
    }

}