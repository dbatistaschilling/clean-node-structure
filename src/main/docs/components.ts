import {
  badRequest,
  serverError,
  unauthorized,
  notFound,
  forbidden
} from './components/'

export default {
  securitySchemes: {
    apiKeyAuth: {
      type: 'apiKey',
      in: 'header',
      name: 'x-access-token'
    }
  },
  badRequest,
  serverError,
  unauthorized,
  notFound,
  forbidden
}
