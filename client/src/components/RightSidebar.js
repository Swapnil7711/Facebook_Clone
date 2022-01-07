import React, { useEffect, useState } from 'react'
import "./RightSidebar.css"
import OnlineComponent from './OnlineComponent.js'
import SidebarItems from "../components/SidebarItems.js"
import { yourPages } from "../data/pages.js"
import SearchIcon from '@material-ui/icons/Search';
import axios from "axios"
function RightSide() {

    const [users, setUsers] = useState([]);

    useEffect(() => {

        const getUsers = () => {
            axios.get("https://randomuser.me/api/?results=10").then((response) => {
                const userData = response.data.results;
                setUsers(userData)
            }).catch(error => console.log("error occured", error))
        }
        getUsers();
    }, [])

    return (
        <div className="rightSidebar">
            <p className="rightsidebar__sponored">Sponsored</p>
            <div className="hrbar" />
            <div className="rightsidebar__yourpages">
                <div className="rightsidebar__pagetitle">
                    <p className="title">Your Pages</p>
                    <p className="more">...</p>
                </div>
                <div className="page__items">
                    {yourPages.map((obj, index) => (
                        <SidebarItems key={index} img={obj['url']} text={obj['text']} flag={true} />
                    ))
                    }

                </div>
                <div className="hrbar" />
                <div className="rightSidebar__birthday">
                    <p className={"birthday__text"}>Birthdays</p>
                    <SidebarItems img={"https://secure.webtoolhub.com/static/resources/icons/set35/6b829976.png"} text={"3 friends have birthday today"} />
                </div>
                <div className="hrbar" />

                <div className="rightSidebar__conntactInfo">

                    <h2 className="contact__text">Contacts</h2>
                    <div className="contactsIcons">
                        <SearchIcon className="contact__searchIcon" />
                        <p className="more">...</p>
                    </div>

                </div>
            </div>
            <div className="online__users">
                {
                    // console.log(users)
                    users.map((obj) => (
                        <OnlineComponent key={obj.login['uuid']} img={obj.picture['thumbnail']} text={obj.name["first"]} online={true} />

                    ))
                }

            </div>
        </div>
    )
}

export default RightSide
