import env from './config/env'
import DatabaseConnectionAdapter from '../infra/mongodb/database-connection-adapter'

DatabaseConnectionAdapter.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(env.port, () => console.log(`server running on port ${env.port}`))
  })
  .catch(console.error)
