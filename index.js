import express from 'express'
import { pool } from './db/connections.js'
import authRoutes from './routes/auth.routes.js'
import usuarioRoutes from './routes/usuario.routes.js'
import cors from 'cors'
import morgan from 'morgan'
import config from  './config.js'


const app = express()

app.get('/ping', async (req, res) => {
    const result = await pool.query('select 1 + 1 as result')
    res.json(result[0])
})

app.use(cors())
app.use(morgan("dev"))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(authRoutes)
app.use(usuarioRoutes)

app.listen(config.port)
console.log('Server on port', config.port)