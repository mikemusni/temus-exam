import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import shortyRoutes from './modules/shorty/routes'

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.use('/shorty', shortyRoutes)

export default app
