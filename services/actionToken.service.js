const {ActionToken} = require('../dataBase');
module.exports = {
    createActionToken: (dataToInsert) => {
        return ActionToken.create(dataToInsert);
    },

    getOneByParamsWithUser: (searchParams) => {
        return ActionToken.findOne(searchParams).populate('user');
    },

    deleteOne: (deleteParams) => {
        return ActionToken.deleteOne(deleteParams);
    },
    deleteMany: (deleteParams) => {
        return ActionToken.deleteMany(deleteParams);
    },
};