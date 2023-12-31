import * as dotenv from 'dotenv'

dotenv.config()

export const DB_PASSWORD = process.env.DB_PASSWORD
export const FIXER_API_KEY = process.env.FIXER_API_KEY
export const SERVER_PORT = process.env.SERVER_PORT
export const PORT = process.env.PORT
export const REACT_APP_CONVERSION_API_BASE_URL = process.env.REACT_APP_CONVERSION_API_BASE_URL
export const DB_URL = `mongodb+srv://frantisekf:${DB_PASSWORD}@cluster0.zrvplni.mongodb.net/?retryWrites=true&w=majority`
