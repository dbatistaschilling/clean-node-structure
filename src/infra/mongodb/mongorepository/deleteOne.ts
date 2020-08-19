import { IDeleteOne } from '@/presentation/utils'
import { repositoryResponse } from '../id-formatter'

export class DeleteOne implements IDeleteOne {
  async deleteOne (collectionName: string, collectionParams: Object): Promise<any> {
    const CollectionModel = (await import(`./schemas/${collectionName}Schema`)).default
    const { _doc } = await CollectionModel.deleteOne(collectionParams)
    return repositoryResponse(_doc)
  }
}
