import { IFindById } from '@/presentation/utils'
import { repositoryResponse } from '../id-formatter'

export class FindByIdAdapter implements IFindById {
  async findById (collectionName: string, id: string): Promise<any> {
    const CollectionModel = (await import(`./schemas/${collectionName}Schema`)).default
    const { _doc } = await CollectionModel.findById(id)
    return repositoryResponse(_doc)
  }
}
