import mongoose, { Schema } from "mongoose"


const RefreshSchema = new Schema({
    token: { type: String, unique: true }
}, { timestamps: false })


export default mongoose.model("RefreshToken", RefreshSchema)