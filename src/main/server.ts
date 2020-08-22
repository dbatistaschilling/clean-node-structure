import 'module-alias/register'
import { resolve } from 'path'
import { config } from 'dotenv'
import DatabaseConnectionAdapter from '@/infra/mongodb/database-connection-adapter'
import colors from 'colors'
import http from 'http'
import mongoose from 'mongoose'

config({ path: resolve(__dirname, '.env') })

DatabaseConnectionAdapter.connect(process.env.MONGO_URL)
  .then(async () => {
    numberRetryTimeout = 1
  })
  .catch((error) => {
    console.log(`${colors.red.bold('CONNECTION ERROR -')} ${colors.red.bold(error.message)}`)
  })

const DATABASE_STATUS = mongoose.connection

let maxAttemptTimeout = null
let numberRetryTimeout = 1
let isUpAndRunning = false
const CONNECTION_TIMEOUT = +process.env.CONNECTION_TIMEOUT || 11000
const MAX_RETRY_TIMEOUT = +process.env.MAX_RETRY_TIMEOUT || 10

DATABASE_STATUS.on('connected', () => {
  console.log('**********************************************************************************************************'.green.bold)
  console.log(`${colors.green.bold('* NOSQL CONNECTION: ')} ${DATABASE_STATUS.readyState} ${colors.green.bold('(0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting)')}`)
  if (!isUpAndRunning) {
    bootstrap()
  }
})

DATABASE_STATUS.on('disconnected', () => {
  console.log('**********************************************************************************************************'.red.bold)
  console.log(`${colors.red.bold('* NOSQL CONNECTION: ')} ${DATABASE_STATUS.readyState} ${colors.red.bold(' (0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting)')}`)
  console.log(`${colors.red.bold('* EVENT DATE: ')} ${new Date()}`)
  console.log('**********************************************************************************************************'.red.bold)
  maxAttemptTimeout = setTimeout(() => {
    console.log(`${colors.blue.bold('CURRENT ATTEMPT RETRY CONNECTION: ')} ${numberRetryTimeout} OF ${MAX_RETRY_TIMEOUT}`)
    numberRetryTimeout = numberRetryTimeout + 1
    DatabaseConnectionAdapter.connect(process.env.MONGO_URL).then(() => {
      numberRetryTimeout = 1
    }).catch((error) => {
      console.log(`${colors.magenta.bold('CONNECTION ERROR -')} ${colors.magenta.bold(error.message)}`)
    })
  }, CONNECTION_TIMEOUT)
})

DATABASE_STATUS.on('error', (err: string) => {
  console.log('**********************************************************************************************************'.red.bold)
  console.log(`${colors.red.bold('* NOSQL CONNECTION: ')} ${DATABASE_STATUS.readyState} ${colors.red.bold(' (0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting)')}`)
  console.log(`${colors.red.bold('* NOSQL ERROR: ')} ${err}`)
  console.log(`${colors.red.bold('* EVENT DATE: ')} ${new Date()}`)
  console.log('**********************************************************************************************************'.red.bold)
  if (numberRetryTimeout > MAX_RETRY_TIMEOUT) {
    clearTimeout(maxAttemptTimeout)
    process.exit(0)
  }
})

async function bootstrap (): Promise<void> {
  const app = (await import('./config/app')).default
  // app.listen(process.env.port, () => console.log(`server running on port ${process.env.port}`))
  app.set('port', +process.env.PORT)
  app.set('address', +process.env.ADDRESS)
  const server = http.createServer(app)
  server.listen(process.env.PORT, +process.env.ADDRESS, () => {
    // amqp.start()
    isUpAndRunning = true
    console.log(`${colors.green.bold('* NODE ENVIRONMENT: ')} ${process.env.NODE_ENV}`)
    console.log(`${colors.green.bold('* SERVER NAME: ')} node-api`)
    console.log(`${colors.green.bold('* REST SERVER LISTENING ON: ')} ${process.env.ADDRESS} PORT: ${colors.green.bold('')} ${process.env.PORT}`)
    console.log(`${colors.green.bold('* REST SERVER PROCESS PID: ')} ${process.pid} ${colors.green.bold(' VERSION: ')} ${process.version} ${colors.green.bold(' PLATFORM: ')} ${process.platform} ${colors.green.bold(' TITLE: ')} ${process.title}`)
    console.log(`${colors.green.bold('* EVENT DATE: ')} ${new Date()}`)
    console.log('**********************************************************************************************************'.green.bold)
  })

  process.on('SIGINT', () => {
    server.close(() => {
      console.log('**********************************************************************************************************'.red.bold)
      console.log(`${colors.red.bold('* REST SERVER SHUTDOWN: ENVIRONMENT: ')} ${process.env.NODE_ENV}`)
      console.log(`${colors.red.bold('* EVENT DATE: ')} ${new Date()}`)
      console.log('**********************************************************************************************************'.red.bold)
      process.exit(0)
    })
  })
}
