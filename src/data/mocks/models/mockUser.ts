import faker from 'faker'

export type UserType = {
  id: String
  name: String
  email: String
  password: String
  accessToken: String
  role: string
}

const UserMock = (): UserType => ({
  id: faker.random.uuid(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  accessToken: faker.random.uuid(),
  role: faker.random.word()
})

export default UserMock
