import { ISignUp, ISignUpInput, ISignUpOutput } from '@/domain/ISignUp'
import { FindOneAdapter } from '@/infra/mongodb/mongorepository/findOne'
import { SaveAdapter } from '@/infra/mongodb/mongorepository'
import { IEncrypter } from '@/presentation/utils/encryption/IEncrypter'
import { EmailInUseError } from '@/presentation/errors'

export class SignUp implements ISignUp {
  constructor (
    private readonly userFind: FindOneAdapter,
    private readonly userSave: SaveAdapter,
    private readonly encrypter: IEncrypter
  ) {}

  async execute (signupInput: ISignUpInput): Promise<ISignUpOutput> {
    const { name, email, password } = signupInput
    const user = await this.userFind.findOne('User', { email })
    if (user) {
      return {
        error: true,
        body: new EmailInUseError()
      }
    }
    const { hashedPassword } = await this.encrypter.encrypt(password)
    const signUpResult = await this.userSave.save('User', { name, email, password: hashedPassword })
    return {
      error: false,
      body: signUpResult
    }
  }
}
