import jwt from "jsonwebtoken"
import { jwt_secret } from '../config'
class jsonToken {

    static sign(payload, secret = jwt_secret, expiry = '1h') {
        return jwt.sign(payload, secret, { expiresIn: expiry })
    }


    static verify(token, secret = jwt_secret) {
        return jwt.verify(token, secret)
    }

}

export default jsonToken