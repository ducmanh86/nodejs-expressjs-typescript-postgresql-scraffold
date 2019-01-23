import compression from 'compression'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import requestId from 'request-id/express'
import zlib from 'zlib'
import {router} from './routes'
import * as error from './utils/error-helper'
import {express as loggerExpress} from './utils/logger'

const app = express()

// nhận đúng request ip từ nginx
app.set('trust proxy', true)

app.use(loggerExpress)

app.use(requestId())

app.use(helmet())

app.use(cors())

app.use(compression({
  chunkSize: 16 * 1024,
  level: zlib.constants.Z_DEFAULT_COMPRESSION,
  memLevel: 8,
  strategy: zlib.constants.Z_DEFAULT_STRATEGY,
  threshold: '1kb',
  windowBits: 15
}))

app.use(express.json({limit: '50mb'}))

app.use(express.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit: 50000
}))

app.use(router)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(new error.NotFoundError(`Not found ${req.originalUrl}`))
})

// error handler
app.use(error.errorDefaultHandler)

export {app}
