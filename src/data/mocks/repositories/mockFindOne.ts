import { IFindOne } from '@/presentation/utils'

export class MockFindOne implements IFindOne {
  async findOne (collectionName: string, collectionParams: Object): Promise<any> {
    const mockModel = (await import(`../models/mock${collectionName}`)).default
    return Promise.resolve(mockModel())
  }
}
