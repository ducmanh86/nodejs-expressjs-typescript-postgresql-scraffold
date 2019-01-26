import compression from 'compression'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import requestId from 'request-id/express'
import {compressionConfig, urlencodedConfig} from './configs'
import {router} from './routes'
import * as error from './utils/error-helper'
import {express as loggerExpress} from './utils/logger'

const app = express()

// nhận đúng request ip từ nginx
app.set('trust proxy', true)
app.set('json spaces', 2)

// Setup requests gZip compression
app.use(compression(compressionConfig))

// Setup common security protection
app.use(helmet())

// Setup Cross Origin access
app.use(cors())

app.use(requestId())

app.use(loggerExpress)

app.use(express.json({limit: '50mb'}))

app.use(express.urlencoded(urlencodedConfig))

app.use(router)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(new error.NotFoundError(`Not found ${req.originalUrl}`))
})

// error handler
app.use(error.errorDefaultHandler)

export {app}
