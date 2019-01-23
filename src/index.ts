import configs from './configs'
import {app} from './server'
import {logger} from './utils/logger'

const server = app.listen(configs.PORT, (err: any) => {
  if (err) {
    logger.error(err)
    // kill process when getting error
    return process.exit(1)
  }

  logger.info(`server is listening on ${configs.PORT}`)
  if (process && process.send) {
    // send 'ready' signal to PM2
    process.send('ready')
  }
})

// exit server when close app
process.on('SIGINT', () => {
  server.close((err: any) => {
    if (err) {
      logger.error(err)
      process.exit(1)
    } else {
      process.exit(0)
    }
  })
})
