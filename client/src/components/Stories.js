import React from 'react'
import "./Stories.css"
import Story from "./Story.js"
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { storyItems } from '../data/storyitems';
import AddIcon from '@material-ui/icons/Add';
import "./Story.css"
function Stories() {
    return (
        <div className="stories">
            <div className="story__create">
                <img src="https://www.adweek.com/wp-content/uploads/2019/10/Instagram-Stories-Create-Mode-Options.png" alt="" className="story__imageCreate" />
                <AddIcon className="add__icon" />
                <h3 className="story__userNameCreate ">Create Story</h3>
            </div>
            <>
                {
                    storyItems.map((items) => (
                        <Story key={items['id']} id={items['id']} img={items['url']} profile={items["profile"]} title={items["text"]} />
                    ))

                }

            </>
            <ArrowForwardIcon className="moreArrow" />
        </div>
    )
}

export default Stories
