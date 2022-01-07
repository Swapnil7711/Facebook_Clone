import dotenv from 'dotenv'


dotenv.config()
export const {
    PORT,
    DEBUG_MODE,
    DB_URL,
    jwt_secret,
    refresh_tokenSecret,
    APP_URL,
    NODE_ENV
} = process.env