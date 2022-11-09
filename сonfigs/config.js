module.exports = {
  PORT: process.env.PORT || 5000 ,
  MONGO_URL: process.env.MONGO_URL || 'mongodb:// localhost:27017/default-db',

  NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL || 'example@gmail.com',
  NO_REPLY_PASSWORD: process.env.NO_REPLY_PASSWORD || 'testTest11',
};
