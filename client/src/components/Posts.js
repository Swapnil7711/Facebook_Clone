import React from 'react'
import "./Posts.css"
import PeopleIcon from '@material-ui/icons/People';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';

function Posts({ postId, postImage, postText, user_first_name, user_last_name, user_profile }) {

    return (
        <div className="posts">
            <div className="post__header">
                <div className="post__profile">
                    <img src={user_profile} alt="" className="post_image" />

                    <div className="post__meta">
                        <h2 className="post__userName">{`${user_first_name} ${user_last_name}`}</h2>
                        <div className="meta">
                            <p className="post__time">5h. </p>
                            <PeopleIcon className="meta__icon" />
                        </div>
                    </div>
                </div>
                <p className="more">...</p>
            </div>
            <div className="post__body">
                <p className="post__text">{postText}</p>
                <img src={postImage} alt="" className="post__image" />
            </div>

            <div className="post__statistic">
                <div className="post__like__count">
                    <ThumbUpAltIcon className="post__like__icon" />
                    <p className="">10+</p>
                </div>
                <p className="post__statisticComments">9+ Comments</p>
            </div>
            <div className="hrbar lesspadding" />

            <div className="post__actionButtons">

                <div className="post__likedDiv">
                    <ThumbUpAltOutlinedIcon className="post__likeButton" />
                    <p className="post__likeText">Like</p>
                </div>

                <div className="post__likedDiv">
                    <ChatBubbleOutlineOutlinedIcon className="post__likeButton" />
                    <p className="post__likeText">Comments</p>
                </div>

            </div>

            <div className="hrbar lesspadding" />
        </div>
    )
}

export default Posts
