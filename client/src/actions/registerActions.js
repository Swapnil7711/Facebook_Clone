
import { LOGOUT_REQUEST_CLEAR, LOGOUT_SUCCESS, LOGOUT_FAIL, USER_DETAILS_FAIL, USER_DETAILS_SUCCESS, USER_DETAILS_REQUEST, REGISTER_LOGOUT_REQUEST, REGISTER_SUCCESS, REGISTER_FAIL, REGISTER_REQUEST, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_REQUEST } from "../constants/registerConstants"
import axios from "axios"

export const registerUser = (formData) => async (dispatch, getState) => {

    try {

        dispatch({ type: REGISTER_REQUEST })

        const { data } = await axios.post("/api/register", formData)

        dispatch({ type: REGISTER_SUCCESS, payload: data })

        dispatch({ type: LOGIN_SUCCESS, payload: data })

        // set localstorage items. set item in localstorage.

        // localStorage.setItem('userInfo', JSON.stringify(getState().userLogin));


    } catch (error) {

        dispatch({

            type: REGISTER_FAIL,

            payload: error.response

        })

    }
}

export const loginUser = (email, password) => async (dispatch, getState) => {

    try {

        dispatch({ type: LOGIN_REQUEST })

        const config = {

            headers: {
                'content-type': 'application/json'
            }
        }

        const { data } = await axios.post("/api/login", { email, password }, config)


        dispatch({ type: LOGIN_SUCCESS, payload: data })

        localStorage.setItem('userInfo', JSON.stringify(getState().userLogin));


    } catch (error) {

        dispatch({

            type: LOGIN_FAIL,

            payload: error.response
        })

    }
}


export const logout = (access_token, token) => async (dispatch) => {

    try {
        localStorage.removeItem('userInfo');
        dispatch({ type: LOGOUT_REQUEST })

        const config = {
            'content-type': 'application/json',
            headers: { Authorization: `Bearer ${access_token}` }
        }

        const { data } = await axios.post('/api/logout', { "token": token }, config)

        dispatch({ type: LOGOUT_SUCCESS, payload: data })
        dispatch({ type: REGISTER_LOGOUT_REQUEST })
        dispatch({ type: LOGOUT_REQUEST_CLEAR })
    } catch (error) {

        dispatch({ type: LOGOUT_FAIL, payload: error.response.data })

    }
}

export const getUserDetails = (access_token) => async (dispatch, getState) => {

    try {
        dispatch({ type: USER_DETAILS_REQUEST })

        const config = {

            headers: { Authorization: `Bearer ${access_token}` }
        }

        const { data } = await axios.get('/api/profile', config)

        dispatch({ type: USER_DETAILS_SUCCESS, payload: data })

        localStorage.setItem('userDetails', JSON.stringify(getState().userDetails));



    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,

            payload: error.response

        })
    }

}