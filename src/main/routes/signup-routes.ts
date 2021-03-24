import { Router } from 'express'
import { makeSignUpFactory } from '../factories/_controllers/SignUpFactory'
import { adaptRoute } from '@/infra/express/express-route-adapter'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpFactory()))
}
