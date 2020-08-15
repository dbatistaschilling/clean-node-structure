export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://mongo:27017/api-name',
  port: process.env.PORT || 5050,
  secret: process.env.SECRET || 'my_big_secret'
}
