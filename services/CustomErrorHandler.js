class CustomeErrorHandler extends Error {


    constructor(status, msg) {
        super()
        this.status = status,
            this.message = msg

    }


    static alreadyExists(message) {
        return new CustomeErrorHandler(409, message)
    }

    static wrongCredentials(message = "Username or Password are Incorrect!") {
        return new CustomeErrorHandler(401, message)
    }

    static unAuthorized(message = "UnAuthorized") {
        return new CustomeErrorHandler(401, message)
    }

    static notFound(message = "Not Found") {
        return new CustomeErrorHandler(404, message)
    }

    static serverError(message = "Internal server Error") {
        return new CustomeErrorHandler(401, message)
    }

    static serverCustomError(message = "This is custom error method. that enable us to find more bugs") {
        return new CustomeErrorHandler(401, message)
    }


}

export default CustomeErrorHandler