import Joi from "joi"
import { User } from "../models"
import CustomeErrorHandler from "../services/CustomErrorHandler"
import bcrypt from "bcrypt"
import jsonToken from "../services/jwtToken"
import { refresh_tokenSecret } from "../config"
import { RefreshToken } from "../models"

const loginController = {

    async login(req, res, next) {


        // validate the inputs
        console.log(req.body)

        const loginShema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).required()
        })

        const { error } = loginShema.validate(req.body)

        if (error) {
            next(error)
        }

        // check if user exsists in database for credentials

        const { email, password } = req.body

        try {

            var user = await User.findOne({ email: email })

        } catch (error) {
            console.log(error)
        }


        console.log(user)

        if (!user) {
            return next(CustomeErrorHandler.wrongCredentials())
        }

        // compare password
        console.log(`${user.password} ${req.body.password}`)
        const match = await bcrypt.compare(password, user.password)
        console.log(match)

        if (!match) {
            return next(CustomeErrorHandler.wrongCredentials())
        }

        const access_token = jsonToken.sign({ email: user.email, name: user.first_name, _id: user._id })
        const refresh_token = jsonToken.sign({ email: user.email, name: user.first_name, _id: user._id }, refresh_tokenSecret, '1y')

        await RefreshToken.create({ token: refresh_token })
        res.json({ access_token: access_token, refresh_token: refresh_token })
    },

    async logout(req, res, next) {

        // check if the request has th e token and delete it from server

        const refreshTokenSchema = Joi.object({
            token: Joi.string().required()

        })
        console.log("reqbody", req.body)
        const { error } = refreshTokenSchema.validate(req.body)

        if (error) {
            return next(error)
        }

        try {

            const deleted = await RefreshToken.deleteOne({ token: req.body.token })
            console.log("deleted", deleted)
            if (deleted.deletedCount < 1) {
                return next(CustomeErrorHandler.unAuthorized("not deleted"))
            }

        } catch (error) {

            return next(new Error("something went wrong!!"))

        }

        res.json({ logout: true })

    }

}


export default loginController

