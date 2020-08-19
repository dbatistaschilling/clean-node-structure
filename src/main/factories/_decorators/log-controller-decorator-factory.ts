import { LogControllerDecorator } from '@/presentation/decorators/log-controller-decorator'
import { ModelRepositoryAdapter } from '@/infra/mongodb/model-repository-adapter'
import { IController } from '@/presentation/protocols'

export const makeLogControllerDecorator = (controller: IController): IController => {
  const modelRepositoryAdapter = new ModelRepositoryAdapter()
  return new LogControllerDecorator(controller, modelRepositoryAdapter)
}
