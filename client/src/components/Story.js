import React from 'react'
import "./Story.css"
function Story({ img, profile, title, id }) {
    return (
        <div className={` story ${id === '2' && "hide__story"}`}>
            <img src={img} alt="" className="story__image" />
            <img src={profile} alt="" className="story__profile" />
            <h3 className="story__userName ">{title}</h3>
        </div>
    )
}

export default Story
