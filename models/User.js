import mongoose, { Schema } from "mongoose"
import { APP_URL } from "../config"

const UserSchema = new Schema({
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    gender: {
        type: String,
        enum: ["male", "female"]
    },
    date_of_birth: { type: Date },

    profile: {
        type: String, get: (profile) => {
            return `${APP_URL}/${profile}`;
        }
    }
}, { timestamps: true, toJSON: { getters: true } })


export default mongoose.model("User", UserSchema)
