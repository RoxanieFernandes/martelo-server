import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import handleError from './error-handling/index.js'

import connect from './db/index.js'
connect()

const app = express()

app.use(cors())

app.use(morgan('dev'))

app.use(express.json())

// app.get('/', (req,res) => res.send ('Está funcionando'))
handleError (app)

export default app
