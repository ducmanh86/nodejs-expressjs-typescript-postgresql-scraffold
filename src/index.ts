import configs from './configs'
import {connectDb} from './models'
import {app} from './server'
import {logger} from './utils/logger'

const startServer = () => {
  const closeServer = () => {
    server.close((err: any) => {
      if (err) {
        logger.error('Unable to close server normaly:', err)
        process.exit(1)
      } else {
        logger.info('Server shutdown successful!')
        process.exit(0)
      }
    })
  }

  const server = app.listen(configs.PORT, (err: any) => {
    if (err) {
      logger.error(err)
      // kill process when getting error
      return process.exit(1)
    }

    logger.info(`server is listening on ${configs.PORT}`)

    // exit server when close app
    process.on('SIGINT', closeServer)
  })
}

connectDb()
  .then(() => {
    logger.info('DB connection has been established successfully.')
    startServer()
  })
  .catch((err) => {
    logger.error('Unable to connect to the database:', err)
    return process.exit(1)
  })
