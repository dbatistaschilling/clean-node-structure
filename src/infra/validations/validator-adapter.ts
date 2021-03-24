import { IValidator } from '@/presentation/utils/validations/IValidator'
import { MissingParamError, AccessDeniedError, InvalidParamError } from '@/presentation/errors'
import validator from 'validator'

export class ValidatorAdapter implements IValidator {
  requires (data: Object, requiredFields: string[]): any {
    const dataSent = Object.keys(data)
    if (dataSent.length === 0) {
      const fields = requiredFields.join(', ')
      return new MissingParamError(fields)
    }
    for (const value of requiredFields) {
      if (!dataSent.includes(value)) {
        return new MissingParamError(value)
      }
    }
  }

  isValid (email: string): any {
    if (!validator.isEmail(email)) {
      return new InvalidParamError('Email')
    }
  }

  passwordMatch (password: string, passwordToCompare: string): any {
    if (password !== passwordToCompare) {
      return new AccessDeniedError()
    }
  }
}
