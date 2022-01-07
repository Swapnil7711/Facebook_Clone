import React from 'react'
import "./SidebarItems.css"


function SidebarItems({ img, text, flag, online }) {
    return (
        <div className={`SidebarItems ${flag && 'extra__rightSidebar'} ${online && 'use__online'}`}>
            <img src={img} alt="" className="sidebar__image" />
            <p className={`sidebar__text ${flag && 'rightItemCss'} `}>{text}</p>
        </div>
    )
}

export default SidebarItems
