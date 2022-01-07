import React from 'react'
import "./OnlineComponents.css"


function OnlineComponent({ img, text, flag, online }) {
    return (
        <div className={`SidebarItems ${online && 'use__online'}`}>
            <div className="image__element">
                <img src={img} alt="" className="sidebar__image" />
                <div className="onlineComponenet__online__users"></div>
            </div>

            <p className={`sidebar__text ${flag && 'rightItemCss'} `}>{text}</p>

        </div>
    )
}

export default OnlineComponent
