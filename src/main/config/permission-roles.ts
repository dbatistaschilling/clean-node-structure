import { adaptMiddleware } from '@/infra/express/express-middleware-adapter'
import { makeIsAuth } from '../factories/_middlewares/is-auth'

export const adminAuth = adaptMiddleware(makeIsAuth('admin'))
export const userAuth = adaptMiddleware(makeIsAuth('user'))
