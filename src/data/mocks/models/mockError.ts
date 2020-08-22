import faker from 'faker'

export type ErrorType = {
  stack: String
}

const ErrorMock = (): ErrorType => ({
  stack: faker.random.words()
})

export default ErrorMock
