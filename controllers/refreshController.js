import { refresh_tokenSecret } from "../config"
import { User } from "../models"
import RefreshToken from "../models/RefreshToken"
import CustomeErrorHandler from "../services/CustomErrorHandler"
import jsonToken from "../services/jwtToken"

const refreshController = {

    async refresh(req, res, next) {
        // check if toen exist in database

        try {

            const token = await RefreshToken.findOne({ token: req.body.token })

            if (!token) {
                return next(CustomeErrorHandler.unAuthorized("Invalid Token"))
            }

            const { _id } = await jsonToken.verify(token.token, refresh_tokenSecret)

            const deletePrevioudToken = await RefreshToken.deleteOne({ token: token.token })

            console.log(deletePrevioudToken)

            let user_id = _id

            try {

                const user = await User.findOne({ _id: user_id })

                console.log(user)

                if (!user) {
                    return next(CustomeErrorHandler.unAuthorized("No user Found"))
                }

                //  generate refresh token

                const access_token = jsonToken.sign({ email: user.email, name: user.first_name, _id: user._id })
                const refresh_token = jsonToken.sign({ email: user.email, name: user.first_name, _id: user._id }, refresh_tokenSecret, '1y')

                await RefreshToken.create({ token: refresh_token })
                res.json({ access_token: access_token, refresh_token: refresh_token })

            } catch (error) {

            }


        } catch (error) {
            return next(error)
        }
    }
}

export default refreshController