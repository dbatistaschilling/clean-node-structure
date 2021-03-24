import { IController, IHttpRequest, IHttpResponse } from '../protocols'
import { badRequest, serverError, ok } from '../helpers/http-helpers'
import { ISignUp } from '@/domain/ISignUp'
import { IValidator } from '../utils/validations/IValidator'

export class SignUpCtrl implements IController {
  constructor (
    private readonly validator: IValidator,
    private readonly signup: ISignUp
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const requiresResult = this.validator.requires(httpRequest.body, ['name', 'email', 'password', 'passwordToCompare'])
      if (requiresResult) {
        return badRequest(requiresResult)
      }
      const isValidResult = this.validator.isValid(httpRequest.body.email)
      if (isValidResult) {
        return badRequest(isValidResult)
      }
      const passwordMatchResult = this.validator.passwordMatch(httpRequest.body.password, httpRequest.body.passwordToCompare)
      if (passwordMatchResult) {
        return badRequest(passwordMatchResult)
      }
      console.log('kkkkk')
      const signUpResult = await this.signup.execute(httpRequest.body)
      if (signUpResult.error) {
        return badRequest(signUpResult.body)
      }
      return ok({ message: 'SignUp with success', user: signUpResult.body })
    } catch (error) {
      return serverError(error)
    }
  }
}
