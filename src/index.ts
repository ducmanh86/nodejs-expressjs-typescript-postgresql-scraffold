import * as dotenv from 'dotenv'
import {app} from './server'

dotenv.config()
const port = process.env.PORT || 3000

const server = app.listen(port, (err: any) => {
  if (err) {
    // tslint:disable-next-line:no-console
    console.error(err)
    // kill process when getting error
    return process.exit(1)
  }

  // tslint:disable-next-line:no-console
  console.log(`server is listening on ${port}`)
  if (process && process.send) {
    // send 'ready' signal to PM2
    process.send('ready')
  }
})

process.on('SIGINT', () => {
  server.close((err: any) => {
    if (err) {
      process.exit(1)
    } else {
      process.exit(0)
    }
  })
})
