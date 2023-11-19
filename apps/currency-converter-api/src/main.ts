import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import currencyRouter from './routes/CurrencyRouter'
import { limiter } from './middleware/rateLimit'
import { DB_URL, SERVER_PORT } from './helpers/constants'
import * as path from 'path';

import baseLogger from './helpers/baseLogger'

const app = express()

const CLIENT_BUILD_PATH = path.join(__dirname, '../nx-fullstack');


try {
  void mongoose.connect(DB_URL)
  baseLogger.info('Connected to MongoDB Atlas')
} catch (err: any) {
  baseLogger.error(err.message)
  throw new Error(err.message)
}

export let cachedCurrrentRates: any

app.use(cors())
app.use(express.json())
app.use(limiter)
app.use(
  express.urlencoded({
    extended: true
  })
)
app.use(express.static(CLIENT_BUILD_PATH));


app.use('/api', currencyRouter)


app.get('*', (request, response) => {
  response.sendFile(path.join(CLIENT_BUILD_PATH, 'index.html'));
});

app.listen(process.env.PORT || 3333, () => {
  baseLogger.info(`Server listening on port ${process.env.PORT}`)
})

export default app
