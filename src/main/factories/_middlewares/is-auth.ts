import { IMiddleware } from '@/presentation/protocols'
import { IsAuth } from '@/main/middlewares/is-auth'
import { FindOneAdapter } from '@/infra/mongodb/mongorepository'

export const makeIsAuth = (role?: string): IMiddleware => {
  const findOneAdapter = new FindOneAdapter()
  return new IsAuth(findOneAdapter, role)
}
