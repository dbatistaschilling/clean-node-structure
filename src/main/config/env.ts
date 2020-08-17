export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/api-name',
  port: process.env.PORT || 5050,
  secret: process.env.SECRET || 'my_big_secret'
}
