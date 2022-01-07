import React, { useEffect } from 'react'
import LeftSidebar from '../components/LeftSidebar';
import MainContainer from '../components/MainContainer';
import RightSide from '../components/RightSidebar';
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router-dom";
import { getUserDetails } from "../actions/registerActions"

function HomeScreen() {

    const history = useHistory();
    const dispatch = useDispatch()
    const getUserState = useSelector(state => state.userLogin)

    const { loading, userkeys } = getUserState

    console.log("userinfo ", userkeys)
    let accessToken;
    if (userkeys) {
        accessToken = userkeys.access_token
    }

    console.log("accessToken", accessToken)

    useEffect(() => {

        if (userkeys) {
            dispatch(getUserDetails(accessToken))

        } else {
            history.push('/login')
        }


    }, [history, userkeys, accessToken, dispatch])

    return (
        <div className="homescreen">
            <div className="app__container">
                {/* left__sidebar */}
                <LeftSidebar />
                {/* main__body - story - input_form - posts */}
                <MainContainer />
                {/* right__sidebar */}
                <RightSide />
            </div>

        </div>
    )
}

export default HomeScreen
