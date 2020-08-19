import { ISave } from '@/presentation/utils'
import { repositoryResponse } from '../id-formatter'

export class SaveAdapter implements ISave {
  async save (collectionName: string, collectionParams: Object): Promise<any> {
    const CollectionModel = (await import(`./schemas/${collectionName}Schema`)).default
    const newCollection = new CollectionModel(collectionParams)
    const { _doc } = await newCollection.save()
    return repositoryResponse(_doc)
  }
}
