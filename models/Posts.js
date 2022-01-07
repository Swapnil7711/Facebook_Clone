import mongoose, { Schema } from "mongoose"
import User from "./User"
import { APP_URL } from "../config"

const PostsSchema = new Schema({

    postText: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    postImage: {
        type: String, get: (postImage) => {
            return `${APP_URL}/${postImage}`;
        }
    }

}, { toJSON: { getters: true } })

export default mongoose.model("Post", PostsSchema)