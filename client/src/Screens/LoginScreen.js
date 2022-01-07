import React, { useState, useEffect } from 'react'
import "./LoginScreen.css"
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from "../actions/registerActions"
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Loader from "../components/Loader"
function LoginScreen() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    // const redirect = location.search ? location.search.split("=")[1] : "/login"
    const history = useHistory();
    const dispatch = useDispatch()

    const userLoginState = useSelector(state => state.userLogin)

    const { loading, error, userkeys } = userLoginState

    let access_token;
    if (userkeys) {
        access_token = userkeys.access_token
    }

    // const access_token = userInfo.userInfo.access_token

    const loginHandler = (e) => {
        e.preventDefault();
        console.log(`${email} ${password}`)
        dispatch(loginUser(email, password))
    }

    const emailHandler = (e) => {

        e.preventDefault();

        setEmail(e.target.value)

    }


    const passwordHandler = (e) => {

        e.preventDefault();

        setPassword(e.target.value)

    }

    useEffect(() => {
        if (userkeys) {
            history.push('/')
        }
    }, [dispatch, access_token, userkeys, history])

    return (

        <>

            {
                loading ? (
                    <Loader />
                ) : (
                    <div className="login">
                        <div className="facebookInfo">
                            <h1 className="facebookName"> Facebook</h1>
                            <p className="info">Facebook helps you connect and share with the people in your life.</p>
                        </div>
                        <div className="facebookLogin">
                            {/* <h2 className="logintext"> Log In</h2> */}
                            <form className="formContainer">
                                <input type="text" onChange={emailHandler} className="email" placeholder="Enter Your Email" />
                                {error && (<p>{error.message}</p>)}
                                <input type="password" onChange={passwordHandler} className="email" placeholder="Enter Your Password" />
                                <button className="loginButton" onClick={loginHandler}> Log In </button>
                                <p className="forgot"> Forgot Password</p>
                            </form>
                            <hr />
                            <Link to="/register" className="alignCenter"> <button className="registerButton">Create an Account</button></Link>
                        </div>

                    </div>

                )
            }


        </>
    )
}

export default LoginScreen