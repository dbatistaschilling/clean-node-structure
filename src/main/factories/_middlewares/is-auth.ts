import { IMiddleware } from '@/presentation/protocols'
import { IsAuth } from '../middlewares/is-auth'
import { ModelRepositoryAdapter } from '@/infra/mongodb/model-repository-adapter'

export const makeIsAuth = (role?: string): IMiddleware => {
  const modelRepositoryAdapter = new ModelRepositoryAdapter()
  return new IsAuth(modelRepositoryAdapter, role)
}
