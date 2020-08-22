import { LogControllerDecorator } from './log-controller-decorator'
import { IController, IHttpRequest, IHttpResponse } from '@/presentation/protocols'
import { serverError, ok } from '@/presentation/helpers/http-helpers'
import { ISave } from '@/presentation/utils'
import UserMock from '@/data/mocks/models/mockUser'
import faker from 'faker'
import { MockSave } from '@/data/mocks/repositories/mockSave'

class ControllerSpy implements IController {
  httpResponse = ok(UserMock())
  httpRequest: IHttpRequest

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    this.httpRequest = httpRequest
    return this.httpResponse
  }
}

const mockRequest = (): IHttpRequest => {
  const password = faker.internet.password()
  return {
    body: {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password,
      passwordConfirmation: password
    }
  }
}

const mockServerError = (): IHttpResponse => {
  const fakeError = new Error()
  fakeError.stack = 'any_stack'
  return serverError(fakeError)
}

type SutTypes = {
  sut: LogControllerDecorator
  controllerSpy: ControllerSpy
  logErrorRepositorySpy: ISave
}

const makeSut = (): SutTypes => {
  const controllerSpy = new ControllerSpy()
  const logErrorRepositorySpy = new MockSave()
  const sut = new LogControllerDecorator(controllerSpy, logErrorRepositorySpy)
  return {
    sut,
    controllerSpy,
    logErrorRepositorySpy
  }
}

describe('LogController Decorator', () => {
  test('Should call controller handle', async () => {
    const { sut, controllerSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(controllerSpy.httpRequest).toEqual(httpRequest)
  })

  test('Should return the same result of the controller', async () => {
    const { sut, controllerSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(controllerSpy.httpResponse)
  })

  test('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerSpy } = makeSut()
    const serverError = mockServerError()
    controllerSpy.httpResponse = serverError
    await sut.handle(mockRequest())
    expect(controllerSpy.httpResponse.body.stack).toEqual(serverError.body.stack)
  })
})
