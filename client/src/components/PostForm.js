import React, { useState } from 'react'
import "./PostForm.css"
import VideoCallIcon from '@material-ui/icons/VideoCall';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import MoodIcon from '@material-ui/icons/Mood';
import { useDispatch, useSelector } from "react-redux"
import { createPost } from "../actions/postActions"
import Loader from "../components/Loader"
function PostForm() {

    const user = useSelector(state => state.userDetails)
    const dispatch = useDispatch();
    let { userDetails } = user
    let userId;
    console.log(userDetails)
    const { loading } = useSelector(state => state.createdPost)
    const [postText, setPostText] = useState('')
    const [imageURL, setimageURL] = useState('')
    const [formImage, setFormImage] = useState(null)


    const handlPostText = (e) => {

        e.preventDefault();
        setPostText(e.target.value)

    }

    const uploadImage = (e) => {

        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setimageURL(reader.result)
            }
        }

        reader.readAsDataURL(e.target.files[0])

        console.log(imageURL)

        setFormImage(e.target.files[0])

    }

    const onFormSubmit = (e) => {

        e.preventDefault();

        if (userDetails) {
            userId = userDetails._id
        }
        const formData = new FormData();
        formData.append("postText", postText);
        formData.append("postImage", formImage);
        formData.append("userId", userId);

        dispatch(createPost(formData))

        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }

        setPostText('');
        setimageURL('')
        setFormImage(null)
    }

    return (
        <div className="postForm">
            <form onSubmit={onFormSubmit}>
                <div className="postForm__postData">
                    <img src={userDetails?.profile} alt="" className="postData__profilePic" />
                    <input value={postText} placeholder={`What's on your mind, ${(userDetails?.first_name)}?`} onChange={handlPostText} type="text" className="postForm__input" />

                </div>
                <div className="displayImage"> <img value={imageURL} className="imageToBeUloaded" src={imageURL} alt="" /> </div>
                <div className="hrbar" />
                <div className="postForm__options">
                    <div className="postForm__data">
                        <VideoCallIcon className="icon" />
                        <p className="text">Live Video</p>
                    </div>
                    <div className="postForm__data" htmlFor="upload-photo">
                        <AddToPhotosIcon className="icon" />
                        <p className="text">Photos/Videos</p>
                        <input className="uploadImage" type='file' name="photo" id="upload-photo" onChange={uploadImage} />
                    </div>
                    <div className="postForm__data">
                        <MoodIcon className="icon" />
                        <p className="text">Feeling/Activity</p>
                    </div>
                </div>
            </form>
            <div className="loaderIndicator">{loading && <Loader />}</div>

        </div>
    )
}

export default PostForm
