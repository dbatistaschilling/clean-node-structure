import { LogControllerDecorator } from '@/presentation/decorators/log-controller-decorator'
import { IController } from '@/presentation/protocols'
import { SaveAdapter } from '@/infra/mongodb/mongorepository'

export const makeLogControllerDecorator = (controller: IController): IController => {
  const saveAdapter = new SaveAdapter()
  return new LogControllerDecorator(controller, saveAdapter)
}
