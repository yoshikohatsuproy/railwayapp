import { config } from "dotenv"
config()

export default {
    port : process.env.PORT || 5000,
    user : process.env.DB_USER || '',
    password : process.env.DB_PASSWORD || '',
    database : process.env.DB_DATABASE || '',
    host     : process.env.DB_HOST || '',
    db_port : process.env.DB_PORT
}
