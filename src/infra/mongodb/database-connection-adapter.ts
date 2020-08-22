import mongoose from 'mongoose'
import { IDatabase } from '@/presentation/utils'

class DatabaseConnectionAdapter implements IDatabase {
  async connect (uri: string): Promise<any> {
    return await mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
  }

  async disconnect (): Promise<void> {
    return await mongoose.disconnect()
  }
}

export default new DatabaseConnectionAdapter()
