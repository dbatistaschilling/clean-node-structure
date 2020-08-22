import { ISave } from '@/presentation/utils'

export class MockSave implements ISave {
  async save (collectionName: string, collectionParams: Object): Promise<any> {
    const mockModel = (await import(`../models/mock${collectionName}`)).default
    return Promise.resolve(mockModel())
  }
}
