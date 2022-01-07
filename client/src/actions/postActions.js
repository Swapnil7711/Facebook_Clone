import { GET_POST_REQUEST, GET_POST_SUCCESS, GET_POST_FAIL, CREATE_POST_REQUEST, CREATE_POST_SUCCESS, CREATE_POST_FAIL } from "../constants/postConstants"
import axios from "axios"

export const createPost = (formData) => async (dispatch) => {

    try {

        dispatch({ type: CREATE_POST_REQUEST })

        console.log(formData)

        const { data } = await axios.post("/api/createPost", formData, { headers: { "Content-Type": "multipart/form-data" } })

        dispatch({ type: CREATE_POST_SUCCESS, payload: data })

    } catch (error) {
        dispatch({ type: CREATE_POST_FAIL, payload: error.response.data })
    }


}


export const getPosts = () => async (dispatch) => {

    try {

        dispatch({ type: GET_POST_REQUEST })

        const { data } = await axios.get("/api/getposts")

        try {

            dispatch({ type: GET_POST_SUCCESS, payload: data })
        } catch (error) {
            console.log(error)
        }



    } catch (error) {
        try {
            dispatch({ type: GET_POST_FAIL, payload: error.response.data })
        } catch (error) {
            console.log(error)
        }

    }


}