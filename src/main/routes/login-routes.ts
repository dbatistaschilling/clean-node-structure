// import { adaptRoute } from '../../infra/express/express-route-adapter'
import { Router } from 'express'
import { userAuth } from '../config/permission-roles'
// import { makeLoginFactory } from '../factories/auth/LoginFactory'

export default (router: Router): void => {
  // router.post('/login', userAuth, adaptRoute(makeLoginFactory()))
  router.post('/auth-test', userAuth, (req, res) => {})
}
