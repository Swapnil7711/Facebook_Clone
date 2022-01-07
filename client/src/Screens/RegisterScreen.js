import React, { useState, useEffect } from 'react'
import "./RegisterScreen.css"
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from "../actions/registerActions"
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Loader from "../components/Loader"


function RegisterScreen({ location }) {

    const [first_name, setFirst_Name] = useState('')
    const [last_name, setLast_Name] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [gender, setGender] = useState('')
    const [date_of_birth, setDate_of_birth] = useState('')
    const [profile, setProfile] = useState(null)

    // const redirect = location.search ? location.search.split("=")[1] : "/"
    const history = useHistory();
    const dispatch = useDispatch()

    const userRegisterState = useSelector(state => state.userLogin)

    const { error, loading, userkeys } = userRegisterState

    const submitForm = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("first_name", first_name);
        formData.append("last_name", last_name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("gender", gender);
        formData.append("date_of_birth", date_of_birth);
        formData.append("profile", profile);
        console.log(formData)

        // const formData = {}
        // formData.firstName = first_name;
        // formData.lastName = last_name;
        // formData.email = email;
        // formData.gender = gender;
        // formData.dob = date_of_birth;
        // formData.password = password;

        // formData.profile = profile;
        // console.log(formData)
        dispatch(registerUser(formData))
    };

    const first_nameHandler = (e) => {
        e.preventDefault();

        setFirst_Name(e.target.value)
    }

    const last_nameHandler = (e) => {
        e.preventDefault();

        setLast_Name(e.target.value)
    }

    const passwordHandler = (e) => {
        e.preventDefault();

        setPassword(e.target.value)
    }

    const emailHandler = (e) => {
        e.preventDefault();

        setEmail(e.target.value)
    }

    const genderHandler = (e) => {
        e.preventDefault();

        setGender(e.target.value)
    }

    const date_of_birthHandler = (e) => {
        e.preventDefault();

        setDate_of_birth(e.target.value)
    }



    useEffect(() => {
        if (userkeys) {
            history.push('/')
        }
    }, [userkeys, history])

    const handleImage = (e) => {
        e.preventDefault()
        setProfile(e.target.files[0])
        console.log(profile)
    };

    return (
        <>
            {loading ? (<Loader />) : (
                <>
                    <h1 className="facebook">Welcome to Facebook</h1>
                    <div className="signup shadow">
                        <h2>Signup</h2>
                        <p>It's quick and easy!</p>
                        <form className="signupForm">
                            <div className="input_names">
                                <input type="text" placeholder="First Name" onChange={first_nameHandler} className="first_name" />
                                <input type="text" placeholder="Last Name" onChange={last_nameHandler} className="last_name" />
                            </div>
                            <input type="text" className="email" onChange={emailHandler} placeholder="Enter Your Email" />
                            <input type="password" className="email" onChange={passwordHandler} placeholder="Create Your Password" />
                            <input type="text" className="email" onChange={date_of_birthHandler} placeholder="Birth date { YYYY-MM-DD }" />
                            <input type="text" className="email" onChange={genderHandler} placeholder="Gender" />
                            <label for="upload-photo">Profile Photo:
                                <input type="file" id="upload-photo" onChange={handleImage} className="profilefile" />
                            </label>
                            <button onClick={submitForm} className="registerButton"> Sign Up </button>
                            <Link to="/login" style={{ textAlign: 'center' }}>Already Member? Login</Link>
                        </form>
                        {error && (<p>{error.message}</p>)}
                    </div>

                </>

            )}

        </>
    )
}

export default RegisterScreen
