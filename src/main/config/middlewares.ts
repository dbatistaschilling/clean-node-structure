import { Express } from 'express'
import { bodyParser, cors, contentType } from '../middlewares'
// import compression from 'compression'

export default (app: Express): void => {
  app.disable('x-powered-by')
  // app.use(locales)
  // app.use(sessions)
  // app.use(helmetFrameguard)
  app.use(bodyParser)
  app.use(cors)
  app.use(contentType)
  // app.use(compression())
}
