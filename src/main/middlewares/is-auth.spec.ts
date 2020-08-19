import { IsAuth } from './is-auth'
import { IHttpRequest } from '@/presentation/protocols'
import { forbidden, ok, serverError } from '@/presentation/helpers/http-helpers'
import { AccessDeniedError } from '@/presentation/errors'
import { IFindOne } from '@/presentation/utils'
import { MockFindOne } from '@/data/mocks/repositories/mockFindOne'

const mockRequest = (): IHttpRequest => ({
  headers: {
    'x-access-token': 'any_token'
  }
})

type SutTypes = {
  sut: IsAuth
  findOne: IFindOne
}

const makeSut = (role?: string): SutTypes => {
  const findOne = new MockFindOne()
  const sut = new IsAuth(findOne, role)
  return {
    sut,
    findOne
  }
}

describe('Auth Middleware', () => {
  test('Should return 403 if no x-access-token exists in headers', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should call findOne with correct accessToken', async () => {
    const role = 'any_role'
    const { sut, findOne } = makeSut(role)
    const httpRequest = mockRequest()
    const mockFindOne = jest.spyOn(findOne, 'findOne')
    await sut.handle(httpRequest)
    expect(mockFindOne).toHaveBeenCalledWith('User', { accessToken: httpRequest.headers['x-access-token'], role })
  })

  test('Should return 403 if findOne returns null', async () => {
    const { sut, findOne } = makeSut()
    jest.spyOn(findOne, 'findOne').mockReturnValueOnce(null)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should return 200 if findOne returns an account', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok({
      accountId: httpResponse.body.accountId
    }))
  })

  test('Should return 500 if findOne throws', async () => {
    const { sut, findOne } = makeSut()
    jest.spyOn(findOne, 'findOne').mockImplementationOnce(async () => Promise.reject(new Error()))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
