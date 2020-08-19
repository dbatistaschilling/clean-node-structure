import { IFindOne } from '@/presentation/utils'
import { repositoryResponse } from '../id-formatter'

export class FindOneAdapter implements IFindOne {
  async findOne (collectionName: string, collectionParams: Object): Promise<any> {
    const CollectionModel = (await import(`./schemas/${collectionName}Schema`)).default
    const { _doc } = await CollectionModel.findOne(collectionParams)
    return repositoryResponse(_doc)
  }
}
