
import { IController } from '@/presentation/protocols'
import { ValidatorAdapter } from '../../../infra/validations/validator-adapter'
import { SignUp } from '@/data/usecases/SignUp'
import { SignUpCtrl } from '@/presentation/controllers/SignUpCtrl'
import { EncrypterAdapter } from '../../../infra/encryption/encrypter-adapter'
import { FindOneAdapter, SaveAdapter } from '@/infra/mongodb/mongorepository'

export const makeSignUpFactory = (): IController => {
  const findOneAdapter = new FindOneAdapter()
  const saveAdapter = new SaveAdapter()
  const encrypter = new EncrypterAdapter()
  const signUp = new SignUp(findOneAdapter, saveAdapter, encrypter)
  const validator = new ValidatorAdapter()
  return new SignUpCtrl(validator, signUp)
}
