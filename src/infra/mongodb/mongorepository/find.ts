import { IFind } from '@/presentation/utils'
import { repositoryResponse } from '../id-formatter'

export class FindAdapter implements IFind {
  async find (collectionName: string, collectionParams: Object, returnFilters: Object): Promise<any> {
    const CollectionModel = (await import(`./schemas/${collectionName}Schema`)).default
    const { _doc } = await CollectionModel.find(collectionParams, returnFilters, { autopopulate: true })
    return repositoryResponse(_doc)
  }
}
