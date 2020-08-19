import { IUpdateOne } from '@/presentation/utils'
import { repositoryResponse } from '../id-formatter'

export class UpdateOneAdapter implements IUpdateOne {
  async updateOne (collectionName: string, collectionParams: Object, collectionUpdatedParams: Object): Promise<any> {
    const CollectionModel = (await import(`./schemas/${collectionName}Schema`)).default
    const { _doc } = await CollectionModel.updateOne(collectionParams, collectionUpdatedParams)
    return repositoryResponse(_doc)
  }
}
