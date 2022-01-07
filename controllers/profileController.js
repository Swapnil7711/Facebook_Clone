import { User } from "../models"
import CustomeErrorHandler from "../services/CustomErrorHandler"

const profileController = {


    async getProfile(req, res, next) {

        try {

            const user = await User.findOne({ _id: req.user._id }).select('-password -__v -updatedAt -createdAt')
            if (!user) {
                return next(CustomeErrorHandler.notFound())
            }

            res.json(user)


        } catch (error) {
            return next(error)
        }

    }

}

export default profileController