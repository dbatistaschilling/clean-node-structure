import { IController, IHttpRequest, IHttpResponse } from '../protocols'
import { ISave } from '../utils'

export class LogControllerDecorator implements IController {
  constructor (
    private readonly controller: IController,
    private readonly logErrorRepository: ISave
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)
    if (httpResponse.statusCode === 500) {
      await this.logErrorRepository.save('Error', httpResponse.body.stack)
    }
    return httpResponse
  }
}
