import Joi from "joi"
import { User } from "../models"
import bcrypt from "bcrypt"
import CustomeErrorHandler from "../services/CustomErrorHandler"
import jsonToken from "../services/jwtToken"
import { refresh_tokenSecret } from "../config"
import { RefreshToken } from "../models"
import multer from "multer"
import path from "path"
import fs from "fs"


const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),

    filename: (req, file, cb) => {

        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`
        cb(null, uniqueName);
    }
});

const handleImageDate = multer({ storage, limits: { fileSize: 1000000 * 5 } }).single('profile')



const registerController = {

    async register(req, res, next) {

        // handl multipart data
        handleImageDate(req, res, async (err) => {

            if (err) {
                return next(CustomeErrorHandler.serverError(err.message))
            }
            console.log(req.body)
            const filepath = req.file && req.file.path



            const registerSchema = Joi.object({
                first_name: Joi.string().max(30).required(),
                last_name: Joi.string().max(30).required(),
                email: Joi.string().email().required(),
                password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).required(),
                gender: Joi.string(),
                repeat_password: Joi.ref("password"),
                date_of_birth: Joi.date()
            })

            const { error } = registerSchema.validate(req.body)

            if (error) {
                // delete image
                // root folder/uploads/imagename
                fs.unlink(`${appRoot}/${filepath}`, (err) => {
                    if (err) {
                        return next(CustomeErrorHandler.serverError(err.message))
                    }
                })
                return next(error)
            }
            // check if user alreafy exists

            const alreadyExist = await User.exists({ email: req.body.email })

            if (alreadyExist) {
                fs.unlink(`${appRoot}/${filepath}`, (err) => {
                    if (err) {
                        return next(CustomeErrorHandler.serverError(err.message))
                    }

                })
                return next(CustomeErrorHandler.alreadyExists("email is already registered!"))
            }
            // hash the password
            const hashedPassword = await bcrypt.hash(req.body.password, 10)

            const user = new User({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: hashedPassword,
                gender: req.body.gender,
                data_of_birth: req.body.data_of_birth,
                profile: filepath
            })

            // GENERATE ACCES TOKEN
            let access_token;
            let refresh_token;
            try {

                const result = await user.save()
                console.log(result)

                access_token = jsonToken.sign({ email: result.email, name: result.first_name, _id: result._id })
                refresh_token = jsonToken.sign({ email: result.email, name: result.first_name, _id: result._id }, refresh_tokenSecret, '1y')

                await RefreshToken.create({ token: refresh_token })

            } catch (error) {
                console.log(refresh_token)
                return next(error)

            }
            res.json({ access_token: access_token, refresh_token: refresh_token })
        });


    }

}
export default registerController