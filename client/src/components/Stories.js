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
                <img src="https://scontent.fpnq9-1.fna.fbcdn.net/v/t1.18169-1/p148x148/12011246_1214757175206748_6596355358517410169_n.jpg?_nc_cat=105&ccb=1-3&_nc_sid=dbb9e7&_nc_ohc=enSFx81yjr0AX9bnbZS&_nc_ht=scontent.fpnq9-1.fna&tp=6&oh=52928770effcac27ab4ce58734923788&oe=60948F17" alt="" className="story__imageCreate" />
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
