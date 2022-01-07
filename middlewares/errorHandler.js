import { DEBUG_MODE } from "../config"
import { ValidationError } from "joi"
import CustomeErrorHandler from "../services/CustomErrorHandler"


export const errorHandler = (err, req, res, next) => {


    let statusCode = 500

    let data = {
        message: "Internal Serever Error",

        ...(DEBUG_MODE === true && { original_message: err.message })

    }

    if (err instanceof ValidationError) {

        statusCode = 422

        data = {
            message: err.message
        }

    }

    if (err instanceof CustomeErrorHandler) {

        statusCode = 409

        data = {
            message: err.message
        }

    }

    res.status(statusCode).json(data)
}