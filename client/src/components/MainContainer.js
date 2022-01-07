import React, { useEffect } from 'react'
import "./MainContainer.css"
import PostForm from "./PostForm.js"
import Posts from "./Posts.js"
import Stories from './Stories'
import { getPosts } from "../actions/postActions"
import { useDispatch, useSelector } from "react-redux"

function MainContainer() {

    const dispatch = useDispatch()
    const postsList = useSelector(state => state.getPosts)

    const createdPost = useSelector(state => state.createdPost)
    const { post } = createdPost
    console.log("created post", post)

    let { posts } = postsList

    if (post != null) {
        posts?.unshift(post);
    }

    console.log(" post", posts)

    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch])

    return (
        <div className="mainContainer">
            {/* stories */}

            <Stories />
            {/* Post form */}
            <PostForm />
            {/* posts */}
            {posts && posts.map((post) => (
                <Posts key={post._id} postId={post?._id} postImage={post?.postImage} postText={post?.postText} user_first_name={post.user?.first_name} user_last_name={post.user?.last_name} user_profile={post.user?.profile} />
            ))}
        </div>
    )
}

export default MainContainer
