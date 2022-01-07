import React from 'react'
import "./LeftSidebar.css"
import SidebarItems from "./SidebarItems.js"
import { leftItems } from "../data/LeftSidebarData.js"
import { useSelector } from "react-redux"


function LeftSidebar() {

    const user = useSelector(state => state.userDetails)

    const { userDetails } = user
    return (

        <div className="leftSidebar hideOn">
            <>
                <SidebarItems className="leftSidebar__item" img={userDetails?.profile} text={` ${userDetails?.first_name} ${userDetails?.last_name}`} />
                { leftItems.map((obj, index) => (
                    <SidebarItems key={index} className="leftSidebar__item" img={obj['url']} text={obj['text']} />

                ))
                }
            </>
            <div className="hrbar" />
            <p className="addtional__info">Your Shortcuts</p>
            <div className="leftSidebar__shortcuts">
                <img src="https://scontent.fpnq9-1.fna.fbcdn.net/v/t1.18169-1/c43.0.148.148a/p148x148/1505061_808598522539030_1165669386948770739_n.png?_nc_cat=107&ccb=1-3&_nc_sid=dbb9e7&_nc_ohc=xI_JIJiup_MAX9bAap_&_nc_ht=scontent.fpnq9-1.fna&_nc_tp=30&oh=0652c0586d508173c2bacfd2f50ce071&oe=6093A718" alt="" className="page__image" />
                <p className="shortcut__name">your Page</p>
            </div>
        </div>
    )
}

export default LeftSidebar
