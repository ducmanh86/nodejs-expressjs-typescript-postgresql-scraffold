import pinoExpress from 'express-pino-logger'
import pino from 'pino'
import configs from '../configs'

export const logger = pino({
  name: configs.APP_NAME,
  level: configs.LOG_LEVEL
})

export const express = pinoExpress({
  logger
})
