import { IUpdateMany } from '@/presentation/utils'
import { repositoryResponse } from '../id-formatter'

export class UpdateManyAdapter implements IUpdateMany {
  async updateMany (collectionName: string, collectionParams: Object, collectionUpdatedParams: Object): Promise<any> {
    const CollectionModel = (await import(`./schemas/${collectionName}Schema`)).default
    const { _doc } = await CollectionModel.updateMany(collectionParams, collectionUpdatedParams)
    return repositoryResponse(_doc)
  }
}
