import { IDeleteMany } from '@/presentation/utils'
import { repositoryResponse } from '../id-formatter'

export class DeleteManyAdapter implements IDeleteMany {
  async deleteMany (collectionName: string, collectionParams: Object): Promise<any> {
    const CollectionModel = (await import(`./schemas/${collectionName}Schema`)).default
    const { _doc } = await CollectionModel.deleteMany(collectionParams)
    return repositoryResponse(_doc)
  }
}
