import { IFindOne } from '@/presentation/utils'

export class MockFindOne implements IFindOne {
  async findOne (collectionName: string, collectionParams: Object): Promise<any> {
    const mockModel = (await import(`../models/mock${collectionName}`)).default
    console.log(mockModel())
    return Promise.resolve(mockModel())
  }
}
