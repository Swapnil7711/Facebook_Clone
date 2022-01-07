import CustomeErrorHandler from "../services/CustomErrorHandler";
import jsonToken from "../services/jwtToken";


const auth = (req, res, next) => {
    console.log(req)
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return next(CustomeErrorHandler.unAthorized())
    }

    const token = authHeader.split(' ')[1]

    if (!token) {
        return next(CustomeErrorHandler.unAuthorized())
    }

    try {

        const { _id, email } = jsonToken.verify(token)

        const user = {
            _id,
            email
        }

        req.user = user;

        next()

    } catch (error) {
        return next(CustomeErrorHandler.unAuthorized())
    }
}

export default auth