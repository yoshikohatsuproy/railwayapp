import {createPool} from 'mysql2/promise'
import config from '../config.js'

console.log(config)
export const pool = createPool({
    host : config.host,
    user : config.user,
    password : config.password,
    port : config.db_port,
    database : config.database
})

