import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const userSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      required: true
    },
    email: {
      type: 'string',
      required: true
    },
    password: {
      type: 'string',
      required: true
    },
    accessToken: {
      type: 'string',
      required: true
    },
    role: {
      type: 'string',
      required: true
    }
  }
}

export default mongoose.model('User', new Schema(userSchema.properties))
