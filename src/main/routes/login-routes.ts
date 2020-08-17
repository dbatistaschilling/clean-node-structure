// import { adaptRoute } from '../../infra/express/express-route-adapter'
import { Router } from 'express'
// import { adaptMiddleware } from '@/infra/express/express-middleware-adapter'
// import { makeIsAuth } from '../factories/is-auth'
// import { makeLoginFactory } from '../factories/auth/LoginFactory'

export default (router: Router): void => {
  // const adminAuth = adaptMiddleware(makeIsAuth('admin'))
  // router.post('/login', adminAuth, adaptRoute(makeLoginFactory()))
}
