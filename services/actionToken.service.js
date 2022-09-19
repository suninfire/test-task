const {ActionToken} = require('../dataBase');
module.exports = {
  createActionToken: (dataToInsert) => ActionToken.create(dataToInsert),

  getOneByParamsWithUser: (searchParams) => ActionToken.findOne(searchParams).populate('user'),

  deleteOne: (deleteParams) => ActionToken.deleteOne(deleteParams),
  deleteMany: (deleteParams) => ActionToken.deleteMany(deleteParams),
};
