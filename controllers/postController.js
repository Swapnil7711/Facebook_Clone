
import multer from "multer"
import path from "path"
import fs from "fs"
import CustomeErrorHandler from "../services/CustomErrorHandler";
import Post from "../models/Posts"


const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads'),
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`
        cb(null, uniqueName);
    }
});

const handlePostImages = multer({ storage, limits: { fileSize: 1000000 * 5 } }).single('postImage')


export const postController = {

    async createPost(req, res, next) {

        // validate the post request. it is importatnt to validate request before creating post to avoid error.

        handlePostImages(req, res, async (err) => {

            if (err) {
                return next(CustomeErrorHandler.serverError(err.message))
            }

            const filepath = req.file && req.file.path

            const post = new Post({
                postText: req.body.postText,
                postImage: filepath,
                user: req.body.userId
            })
            let result;
            try {

                // result = await post.save()

                result = await Post.create({
                    postText: req.body.postText,
                    postImage: filepath,
                    user: req.body.userId
                })
                console.log(result)

            } catch (error) {
                return next(CustomeErrorHandler.serverError())
            }

            const userPost = await Post.findById(result._id).then(doc => (doc.populate('user', 'first_name last_name profile').execPopulate()))

            res.json(userPost)

        })
    },


    async getPosts(req, res, next) {

        try {
            //  to find the reverse order add date field
            // const posts = await Post.find().then(doc => (doc.populate('user', 'first_name last_name profile').execPopulate()))

            let posts = await Post.find().populate('user', 'first_name last_name profile').select('-id')

            posts = posts.reverse()

            res.json(posts);
        } catch (error) {
            return res.json(error.message)
        }

    }
}

export default postController

