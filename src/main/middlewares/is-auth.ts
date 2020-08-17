import { IMiddleware, IHttpRequest, IHttpResponse } from '@/presentation/protocols'
import { IModelRepository } from '@/presentation/utils'
import { forbidden, serverError, ok } from '@/presentation/helpers/http-helpers'
import { AccessDeniedError } from '@/presentation/errors'

export class IsAuth implements IMiddleware {
  constructor (
    private readonly loadAccountByToken: IModelRepository,
    private readonly role?: string
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const accessToken = httpRequest.headers?.['x-access-token']
      if (accessToken) {
        const account = await this.loadAccountByToken.findOne('User', { accessToken, role: this.role })
        if (account) {
          return ok({ accountId: account.id })
        }
      }
      return forbidden(new AccessDeniedError())
    } catch (error) {
      return serverError(error)
    }
  }
}
