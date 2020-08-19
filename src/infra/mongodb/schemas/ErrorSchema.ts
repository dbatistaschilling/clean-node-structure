import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const errorSchema = {
  type: 'object',
  properties: {
    error: {
      type: 'string',
      required: true
    }
  }
}

export default mongoose.model('User', new Schema(errorSchema.properties))
